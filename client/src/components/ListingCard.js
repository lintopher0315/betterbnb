import React from 'react';
import cx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import LocationOn from '@material-ui/icons/LocationOn';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Favorite from '@material-ui/icons/Favorite';
import FaceGroup from '@mui-treasury/components/group/face';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';

const useStyles = makeStyles(() => ({
    content: {
        padding: 24,
        margin: '-24% 16px 0',
        backgroundColor: '#fff',
        borderRadius: 4,
        position: 'relative',
        opacity: '95%',
    }
}))

function ListingCard(props) {
    const styles = useStyles();
    const mediaStyles = useWideCardMediaStyles();
    const shadowStyles = useFadedShadowStyles();
    const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
    return (
        <Card elevation={0} className="listing-card-root">
            <CardMedia
                classes={mediaStyles}
                image={
                    props.img
                }
            />
            <CardContent className={cx(shadowStyles.root, styles.content)}>
                <IconButton className="listing-card-fav">
                    <Favorite />
                </IconButton>
                <h3 className="listing-card-title">{props.title}</h3>
                <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
                    <LocationOn className="listing-card-loc" />
                    <span>{props.loc}</span>
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={1}
                    className={gutterStyles.parent}
                >
                    <Rating id="listing-card-star" name={'rating'} value={props.rating} size={'small'} />
                    <Typography variant={'body2'} className="listing-card-rate">
                        {(props.rating).toFixed(1)}
                    </Typography>
                </Box>
                <Typography id="listing-card-text" color={'textSecondary'}>
                    {props.price}
                </Typography>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        className={gutterStyles.parent}
                    >
                        <FaceGroup
                            faces={[
                                'https://i.pravatar.cc/300?img=1',
                                'https://i.pravatar.cc/300?img=2',
                                'https://i.pravatar.cc/300?img=3',
                                'https://i.pravatar.cc/300?img=4',
                            ]}
                            size={32}
                            offset={-12}
                        />
                        <Typography
                            component={'span'}
                            variant={'body2'}
                            color={'textSecondary'}
                        >
                            +420
                        </Typography>
                    </Box>
                    <IconButton className="listing-card-opt" size={'small'}>
                        <MoreHoriz />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ListingCard;