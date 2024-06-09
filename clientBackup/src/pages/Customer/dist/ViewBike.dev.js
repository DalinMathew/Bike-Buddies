// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Form, Input, Card, Button, Avatar } from 'antd';
// import ImageUploader from 'react-images-upload';
// import axios from 'axios';
// import { editProfile } from '../../reducers/authReducer';
// const Profile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.auth?.user);
//   console.log(user);
//   const role = user?.role || '';
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [mobile, setMobile] = useState(user.mobile);
//   const [userName, setUserName] = useState(user.username);
//   const [photo, setPhoto] = useState(user.photo);
//   const [photo2, setPhoto2] = useState();
//   const [bikeDetails, setBikeDetails] = useState(user.bikeDetails);
//   const [availability, setAvailability] = useState(user.availability);
//   const [rates, setRates] = useState(user.rates);
//   const [active, setActive] = useState(true);
//   const onNameChange = (txt) => {
//     setName(txt.target.value);
//   };
//   const onEmailChange = (txt) => {
//     setEmail(txt.target.value);
//   };
//   const onUserNameChange = (txt) => {
//     setUserName(txt.target.value);
//   };
//   const onMobileChange = (txt) => {
//     setMobile(txt.target.value);
//   };
//   const onsave = () => {
//     dispatch(
//       editProfile({
//         name: name,
//         email: email,
//         username: userName,
//         mobile: mobile,
//         photo: photo,
//         photo2: photo2,
//         bikeDetails: bikeDetails,
//         availability: availability,
//         rates: rates,
//       })
//     );
//   };
//   const uploadFileToServer = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.url;
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       return null;
//     }
//   };
//   const onFileChange = async (event) => {
//     const file = event[0];
//     const fileUrl = await uploadFileToServer(file);
//     setPhoto(fileUrl);
//     setActive(false);
//   };
//   const onFileChange1 = async (event) => {
//     const file = event[0];
//     const fileUrl = await uploadFileToServer(file);
//     setPhoto2(fileUrl);
//     setActive(false);
//   };
//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-body">
//           <div className="avatar">
//             <Avatar size="large" src={user.photo} />
//           </div>
//           <h5 className="card-title">{user.name}</h5>
//           <h5 className="card-text">{'@' + user.username}</h5>
//           <p className="card-text">
//             {user.email}
//             <br />
//             <span className="phone">{user.mobile}</span>
//           </p>
//         </div>
//         <span>user's Bio</span>
//       </div>
//       <Card className="Form">
//         <Form size="middle" colon={true} labelAlign="left" layout="vertical">
//           <Form.Item label="Name:">
//             <Input allowClear={true} className="input" value={name} onChange={onNameChange} />
//           </Form.Item>
//           <Form.Item label="User Name:">
//             <Input allowClear={true} className="input" value={userName} onChange={onUserNameChange} />
//           </Form.Item>
//           <Form.Item label="Email:">
//             <Input allowClear={true} className="input" value={email} onChange={onEmailChange} />
//           </Form.Item>
//           <Form.Item label="Mobile:">
//             <Input allowClear={true} className="input" value={mobile} onChange={onMobileChange} />
//           </Form.Item>
//           {role === 'customer' || role === 'admin' ? (
//             <></>
//           ) : (
//             <>
//               <Form.Item label="ID Proof:">
//                 <ImageUploader
//                   withIcon={true}
//                   buttonText="Choose images"
//                   onChange={onFileChange}
//                   imgExtension={['.jpg', '.png']}
//                   maxFileSize={1048576}
//                   singleImage={true}
//                   label="max size 1MB"
//                 />
//               </Form.Item>
//               <Form.Item label="Photo:">
//                 <ImageUploader
//                   withIcon={true}
//                   buttonText="Choose images"
//                   onChange={onFileChange1}
//                   imgExtension={['.jpg', '.png']}
//                   maxFileSize={1048576}
//                   singleImage={true}
//                   label="max size 1MB"
//                 />
//               </Form.Item>
//             </>
//           )}
//           <Button disabled={!active} onClick={onsave} loading={!active}>
//             Save Changes
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };
// export default Profile;
"use strict";