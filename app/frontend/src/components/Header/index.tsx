import React, { useEffect } from 'react';

import { HeaderDiv, HeaderContent, Profile, StyledLink } from './styles';
import logoImg from '../../assets/logo_dark_mode.svg';
import { useAuth } from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

const Header: React.FC = () => {
  const { signOut, user, userType } = useAuth();

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
        {userType === 'Customer' && (
          <StyledLink type="button" to="/profile-customer">
            <FiEdit />
          </StyledLink>
        )}
        {userType === 'Company' && (
          <StyledLink type="button" to="/profile-customer">
            <FiEdit />
          </StyledLink>
        )}
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderDiv>
  );
};

export default Header;
