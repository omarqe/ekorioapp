export default function createSceneMap(routes = [], onPress, body, scenes = {}) {
    routes.map(({ key, data }) => {
        scenes = { ...scenes, [key]: body.bind(null, { data, onPress }) };
    });

    return scenes;
}
