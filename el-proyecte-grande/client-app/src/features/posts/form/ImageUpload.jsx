import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from "../../../app/stores/store";
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  
  const {petPhotoStore, commonStore} = useStore();
  // const { petPhotoRegistry, createPetPhoto, loading, loadingInitial } = petPhotoStore;
  const [files, setFiles] = useState([]);
  const {isSubmitted, postId} = props;
  // const [photo, setPhoto] = useState<import('../../../app/models/petPhoto').PetPhoto>({
  //   id: '',
  //   file: null,
  //   postId: postId
  // })
  // useEffect(() => {
  //   if(isSubmitted){
  //     files.forEach(file => {
  //       let newPhoto = {
  //         ...photo,
  //         id: uuid()
  //       }
  //       newPhoto.file = file;
  //       createPetPhoto(newPhoto);
  //     })
      
  //   }
  // }, [isSubmitted])
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        width={300}
        height={300}
        alt={file.name}
        style={{paddingTop:15, paddingRight:15}}
      />
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div>Upload your images here</div>
      </div>
      <div style={{display:'flex', flexDirection:'row'}}>
        {thumbs}
      </div>
    </section>
  )
}

export default DropzoneComponent;