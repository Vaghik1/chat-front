import React, { useState, useCallback } from 'react';
// import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

// import FormField from '../../components/common/form-fields';
import { getCroppedImg } from '../../utils/images/crop';

const useStyles = makeStyles(theme => ({
    imageInput: {
        display: 'none'
    },
    image: {
        marginBottom: 0
    }
}));

function ProfileImage() {
    const classes = useStyles();
    const [crop, setCrop] = useState({
        unit: '%',
        aspect: 1,
        width: 100,
        height: 100,
    });
    const [imageSrc, setImageSrc] = useState('');
    const [newImage, setNewImage] = useState('');
    const [cropedImageSrc, setCropedImageSrc] = useState('');
    const onLoad = useCallback(img => {
        setNewImage(img);
    }, []);
    const handleUploadClick = useCallback((event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        event.target.value = null;
        reader.onloadend = () => {
            setCropedImageSrc('');
            setImageSrc(reader.result);
        };
    }, []);
    const cropImage = useCallback(() => {
        const croppedImg = getCroppedImg(newImage, crop, 'profileImage');
        setCropedImageSrc(croppedImg);
        setImageSrc('');
    }, [crop, newImage]);
    const cancelCropImage = useCallback(() => {
        setCropedImageSrc('');
        setImageSrc('');
    }, []);

    return (
        <>
            <Grid item>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleUploadClick}
                    className={classes.imageInput}
                />
                <label htmlFor="contained-button-file" className={classes.image}>
                    <Fab component="span">
                        <AddPhotoAlternateIcon />
                    </Fab>
                </label>
            </Grid>
            {imageSrc ?
                <Grid item>
                    <Fab component="span" onClick={cropImage}>
                        <CheckIcon />
                    </Fab>
                </Grid>
                : null
            }
            {imageSrc || cropedImageSrc ?
                <Grid item>
                    <Fab component="span" onClick={cancelCropImage}>
                        <CancelIcon />
                    </Fab>
                </Grid>
                : null
            }
            {
                imageSrc || cropedImageSrc ?
                    <Grid item xs={12}>
                        {
                            cropedImageSrc ?
                                <img src={cropedImageSrc} alt='Profile' />
                                : <ReactCrop src={imageSrc} onImageLoaded={onLoad} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                        }
                        {/* <Field
                            name="image"
                            label="Image"
                            component={FormField}
                            type="text"
                            fullWidth
                        /> */}
                    </Grid>
                    : null
            }
        </>
    );
}

export default ProfileImage;