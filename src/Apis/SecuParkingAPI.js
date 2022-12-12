import axios from 'axios';

export const CutImageAPI = img => {
  let formData = new FormData();
  formData.append('data', {
    uri: img?.uri,
    name: img?.path,
    type: 'image/jpg',
  });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8041/predictions/plate', formData, config)
      .then(res => {
        resole(res);
      })
      .catch(function (er) {
        reject(er);
      });
  });
};
export const DetailImageAPI = img => {
  let formData = new FormData();
  formData.append('data', {
    uri: Platform.OS === 'ios' ? `/private${img?.path}` : `file://${img?.path}`,
    name: `${img?.path}`,
    type: 'image/jpg',
  });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resole, reject) => {
    axios
      .post('http://210.245.51.29:8011/predictions/plate/', formData, config)
      .then(res => {
        resole(res);
      })
      .catch(function (er) {
        reject(er);
      });
  });
};

// export const DetailImageAPI = img => {
//   const formData = new FormData();
//   formData.append('data', img);
//   return new Promise((resole, reject) => {
//     axios
//       .post('http://210.245.51.29:8011/predictions/plate/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then(res => {
//         console.log('res', res.data);
//         resole(res.data);
//       })
//       .catch(errors => {
//         alert(errors);
//         console.log('res', errors.response);

//         reject(errors => console.log(errors));
//       });
//   });
// };
