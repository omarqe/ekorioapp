import React from "react";
import PropTypes from "prop-types";

import Layout from "../layout";
import Body from "../layout/body";
import List from "../list";
import Empty from "../empty";
import EmptyArt from "../../../assets/arts/ginger-cat-722.svg";

import _renderIf from "../../functions/renderIf";

export default function AppointmentScene({ data = [], loading = false, initiated = false, onPress }) {
    if (loading || !initiated) {
        data = [];
        loading = true;
        for (let i = 1; i < 3; i++) {
            const key = i.toString();
            data = [...data, { text: key, subtitle: key, badge: { text: key } }];
        }
    }

    return (
        <Layout scrollEnabled={false} gray>
            <Body gray flex expanded>
                {_renderIf(
                    data?.length > 0,
                    <List list={data} loading={loading} onPress={onPress} bounces scrollEnabled />,
                    <Empty
                        art={EmptyArt}
                        artProps={{ style: { marginBottom: -10 } }}
                        title="Oh mom, look it's empty! 👀"
                        subtitle="Your upcoming appointments will appear here"
                    />
                )}
            </Body>
        </Layout>
    );
}

AppointmentScene.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    initiated: PropTypes.bool,
    onPress: PropTypes.func,
};
