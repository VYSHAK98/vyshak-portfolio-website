import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            // Recolor the character per body part. The skin (face, ears,
            // neck, hands) and clothes share a single material, so we colour
            // by mesh name and clone the material per mesh. Hair and eyebrows
            // (separate dark materials) and the textured eyes are left as-is.
            const SKIN = new THREE.Color("#d99e6c");
            const CLOTHES = new THREE.Color("#34343a"); // dark gray
            const SHOES = new THREE.Color("#191919");
            const pickColor = (name: string): THREE.Color | null => {
              // GLTFLoader strips dots from node names ("Plane.007" -> "Plane007"),
              // so normalize before matching.
              const n = name.toLowerCase().replace(/[^a-z0-9]/g, "");
              if (n.includes("shirt") || n.includes("pant")) return CLOTHES;
              if (n.includes("shoe") || n.includes("sole")) return SHOES;
              if (
                n.includes("ear") ||
                n.includes("hand") ||
                n.includes("neck") ||
                n.includes("plane007") // the head/face mesh
              )
                return SKIN;
              return null;
            };
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Only recolor skinned meshes (the rigged figure) — the desk,
                // keyboard and monitor are static and stay as-is. Clone the
                // material so shared ones aren't recolored on static props, and
                // skip textured parts (eyes) and near-black parts (eyebrows).
                if (child.isSkinnedMesh) {
                  const target = pickColor(child.name);
                  if (target) {
                    const mats = Array.isArray(mesh.material)
                      ? mesh.material
                      : [mesh.material];
                    const recolored = mats.map((m: any) => {
                      if (!m || m.map) return m;
                      const lum = m.color
                        ? m.color.r + m.color.g + m.color.b
                        : 0;
                      if (lum < 0.6) return m;
                      const cloned = m.clone();
                      cloned.color = target.clone();
                      return cloned;
                    });
                    mesh.material = Array.isArray(mesh.material)
                      ? recolored
                      : recolored[0];
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
