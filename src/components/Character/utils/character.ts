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
            const bodyTint = new THREE.Color("#c2a4ff");
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Tint the character body with the site's purple accent. Only
                // skinned meshes (the rigged figure) are recolored; the desk,
                // keyboard and monitor are static meshes and stay as-is.
                // Materials are cloned so shared ones aren't recolored on the
                // static props. Textured parts (eyes) and near-black parts
                // (eyebrows) are left untouched so they stay natural.
                if (child.isSkinnedMesh) {
                  const mats = Array.isArray(mesh.material)
                    ? mesh.material
                    : [mesh.material];
                  const tinted = mats.map((m: any) => {
                    if (!m || m.map) return m;
                    const lum = m.color
                      ? m.color.r + m.color.g + m.color.b
                      : 0;
                    if (lum < 0.6) return m;
                    const cloned = m.clone();
                    cloned.color = bodyTint.clone();
                    return cloned;
                  });
                  mesh.material = Array.isArray(mesh.material)
                    ? tinted
                    : tinted[0];
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
