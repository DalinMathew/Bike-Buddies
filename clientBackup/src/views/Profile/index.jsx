import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Card, Button, Avatar } from "antd";
import { editProfile } from "../../reducers/authReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  let role = "";
  if (user.role) {
    role = user.role;
  }
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [userName, setUserName] = useState(user.username);
  const [photo, setPhoto] = useState(user.photo);
  const [photo2, setPhoto2] = useState();
  const [age, setAge] = useState(user.age);

  const [bikeDetails, setBikeDetails] = useState(user.bikeDetails);
  const [availability, setAvailability] = useState(user.availability);
  const [rates, setRates] = useState(user.rates);
  const [active, setActive] = useState(true);

  const onNameChange = (txt) => {
    setName(txt.target.value);
  };
  const onEmailChange = (txt) => {
    setEmail(txt.target.value);
  };
  const onUserNameChange = (txt) => {
    setUserName(txt.target.value);
  };
  const onMobileChange = (txt) => {
    setMobile(txt.target.value);
  };
  const onAgeChange = (txt) => {
    setAge(txt.target.value);
  };

  const onFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const onFileChange1 = (event) => {
    setPhoto2(event.target.files[0]);
  };

  const onsave = () => {
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("role", user.role);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("username", userName);
    formData.append("photo2", photo2);

    dispatch(editProfile(formData));
  };

  const showImage = (image) => {
    return (
      <>
        <a href={image} title={"title"} data-lightbox-gallery="gallery1">
          <div className="hover-text"></div>
          <img
            style={{ float: "inline-end" }}
            width={"150px"}
            height={"150px"}
            src={image}
            className="img-responsive"
            alt={"title"}
          />{" "}
        </a>
      </>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Avatar
              size="large"
              src={`http://localhost:9000/media/${user.photo}`}
            />
            {role === "rider" && (
              <p style={{ marginRight: "40px", float: "right" }}>ID PROOF </p>
            )}
            <br />
            {user.photo2 ? (
              showImage(`http://localhost:9000/media/${user.photo2}`)
            ) : (
              <></>
            )}
          </div>
          <h5 className="card-title">{user.name}</h5>
          <h5 className="card-text">{"@" + user.username}</h5>
          <p className="card-text">
            {user.email}
            <br />
            <span className="phone">{user.mobile}</span>
          </p>
        </div>
      </div>
      <Card className="Form">
        <Form size="middle" colon={true} labelAlign="left" layout="vertical">
          <Form.Item label="Name:">
            <Input
              allowClear={true}
              className="input"
              value={name}
              onChange={onNameChange}
            />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input
              allowClear={true}
              className="input"
              value={userName}
              onChange={onUserNameChange}
            />
          </Form.Item>
          <Form.Item label="Email:">
            <Input
              allowClear={true}
              className="input"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Item>
          {role !== "admin" && (
            <Form.Item label="Age:">
              <Input
                allowClear={true}
                className="input"
                value={age}
                onChange={onAgeChange}
              />
            </Form.Item>
          )}
          <Form.Item label="Mobile:">
            <Input
              allowClear={true}
              className="input"
              value={mobile}
              onChange={onMobileChange}
            />
          </Form.Item>
          {role === "customer" ? (
            <Form.Item label="Photo:">
              <input type="file" onChange={onFileChange} />
            </Form.Item>
          ) : role !== "admin" ? (
            <>
              <Form.Item label="Photo:">
                <input type="file" onChange={onFileChange} />
              </Form.Item>
              <Form.Item label="ID Proof:">
                <input type="file" onChange={onFileChange1} />
              </Form.Item>
            </>
          ) : (
            <></>
          )}

          <Button disabled={!active} onClick={onsave} loading={!active}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
