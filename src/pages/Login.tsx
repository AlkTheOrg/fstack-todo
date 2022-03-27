import React from 'react';
import { connect } from 'react-redux';

interface Props {

}

export const Login: React.FC<Props> = (props) => {
  return(
    <h1>Login</h1>
  );
};

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
