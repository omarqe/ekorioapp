export default function createSceneMap(routes = [], body, scenes = {}) {
    routes.map(({ key, data }) => {
        scenes = { ...scenes, [key]: body.bind(null, { data }) };
    });

    return scenes;
}
