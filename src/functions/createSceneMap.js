export default function createSceneMap(routes = [], onPress, body, scenes = {}, loading) {
    routes.map(({ key, data }) => {
        scenes = { ...scenes, [key]: body.bind(null, { data, loading, onPress }) };
    });

    return scenes;
}
