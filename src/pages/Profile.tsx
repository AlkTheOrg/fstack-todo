import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../styles/Form.scss"
import { useDispatch } from 'react-redux';
import { remove, reset, setUser, update } from '../slices/authSlice';
import { reset as resetTodoState } from "../slices/todoSlice";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  useEffect(() => {
    if (!user || (user && !user.id)) {
      navigate('/login');
    }
  }, [navigate, user])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userPrompt = window.confirm("Are you sure?");
    console.log(userPrompt);
    if (userPrompt) {
      console.log('handled profile update');
      const resultAction = await dispatch(update({ userId: user ? user.id : '', user: { username, password } }));
      if (update.fulfilled.match(resultAction)) {
        console.log('handled profile update');
        const foundUser = resultAction.payload;
        dispatch(setUser(foundUser));
        console.log('foundUser:', foundUser);
      }
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const userPrompt = window.confirm("Are you sure?");
    console.log(userPrompt);
    if (userPrompt) {
      console.log('handled profile delete');
      await dispatch(remove(user ? user.id : ''));
      dispatch(resetTodoState());
    }

  };

  return (
    <div className="Form" style={{background: "#25aef5"}}>
      <div className="page">
        <div>
          <h2>Profile</h2>
        </div>
        <div className="validation">{message ? message : ''}</div>
        <form onSubmit={handleUpdate}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            value={username}
            id="username"
            required
            disabled={isLoading}
            minLength={3}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            required
            disabled={isLoading}
            minLength={6}
          />
          <button type="submit" id="submit" disabled={isLoading}>UPDATE</button>
          <button onClick={handleDelete} className="danger" type="button" disabled={isLoading}>DELETE</button>
        </form>
      </div>
    </div>
  );
}

export default Profile
