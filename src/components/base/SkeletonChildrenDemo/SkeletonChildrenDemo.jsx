import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
  },
}));

export default function SkeletonChildren(props) {
  const { loading = false } = props;
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box margin={1}>
          {loading ? (
            <Skeleton >
                {props.children}
            </Skeleton>
          ) : (
            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
          )}
        </Box>
      </Box>
    
    </div>
  );
}

SkeletonChildren.propTypes = {
  loading: PropTypes.bool,
};

