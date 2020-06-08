import React from 'react';

import { HeaderDiv, HeaderContent, Profile } from './styles';
import logoImg from '../../assets/logo_dark_mode.svg';
import { useAuth } from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <HeaderDiv>
      <HeaderContent>
        <img src={logoImg} alt="OffTalk" />
        <Profile>
          <img
            src="https://avatars2.githubusercontent.com/u/55264885?s=460&u=9935b27a5aec8201acbd5cf9af80728d3dd728ba&v=4"
            alt={user.name}
          />
          <div>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderDiv>
  );
};

export default Header;
