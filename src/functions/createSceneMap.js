export default function createSceneMap(routes = [], body) {
    let scenes = {};
    routes.map(({ key, data }) => {
        scenes = { ...scenes, [key]: body };
    });

    return scenes;
}
