const DEFAULT_CONFIG = {
  cdnBase: "https://cdn.jsdelivr.net/npm",
  handsPackage: "@mediapipe/hands",
  segmentationPackage: "@mediapipe/selfie_segmentation",
};

const registry = new Map();
const loadedScripts = new Map();

function getRuntimeConfig() {
  return {
    ...DEFAULT_CONFIG,
    ...(window.AR_GESTURE_CONFIG || {}),
  };
}

function packageUrl(packageName, fileName) {
  const config = getRuntimeConfig();
  return `${config.cdnBase.replace(/\/$/, "")}/${packageName}/${fileName}`;
}

function loadScriptOnce(id, src) {
  if (loadedScripts.has(id)) return loadedScripts.get(id);

  const promise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-skill-id="${id}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", () => reject(new Error(`技能脚本加载失败：${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.skillId = id;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", () => reject(new Error(`技能脚本加载失败：${src}`)), { once: true });
    document.head.appendChild(script);
  });

  loadedScripts.set(id, promise);
  return promise;
}

function registerSkill(skill) {
  registry.set(skill.id, {
    ...skill,
    status: "pending",
    error: null,
  });
}

async function loadSkill(id) {
  const skill = registry.get(id);
  if (!skill) throw new Error(`未知技能模块：${id}`);
  if (skill.status === "ready") return skill;

  try {
    skill.status = "loading";
    await skill.load();
    skill.verify();
    skill.status = "ready";
    return skill;
  } catch (error) {
    skill.status = "failed";
    skill.error = error;
    throw error;
  }
}

registerSkill({
  id: "mediapipe-hands",
  label: "MediaPipe Hands",
  async load() {
    const config = getRuntimeConfig();
    await loadScriptOnce("mediapipe-hands", packageUrl(config.handsPackage, "hands.js"));
  },
  verify() {
    if (!window.Hands) throw new Error("MediaPipe Hands 未暴露 window.Hands。");
  },
});

registerSkill({
  id: "mediapipe-selfie-segmentation",
  label: "MediaPipe Selfie Segmentation",
  async load() {
    const config = getRuntimeConfig();
    await loadScriptOnce(
      "mediapipe-selfie-segmentation",
      packageUrl(config.segmentationPackage, "selfie_segmentation.js"),
    );
  },
  verify() {
    if (!window.SelfieSegmentation) throw new Error("MediaPipe SelfieSegmentation 未暴露 window.SelfieSegmentation。");
  },
});

function getSkillReport() {
  return Array.from(registry.values()).map(({ id, label, status, error }) => ({
    id,
    label,
    status,
    error: error ? error.message : null,
  }));
}

async function loadMediaPipeSkills() {
  await loadSkill("mediapipe-hands");
  await loadSkill("mediapipe-selfie-segmentation");

  const config = getRuntimeConfig();
  return {
    locateHandsFile(file) {
      return packageUrl(config.handsPackage, file);
    },
    locateSegmentationFile(file) {
      return packageUrl(config.segmentationPackage, file);
    },
    report: getSkillReport(),
  };
}

window.ARSkillLoader = {
  getRuntimeConfig,
  getSkillReport,
  loadMediaPipeSkills,
  loadSkill,
};

document.documentElement.dataset.skillLoader = "ready";
