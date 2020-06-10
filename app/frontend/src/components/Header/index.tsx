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
        <Link to="/">
          <img src={logoImg} alt="OffTalk" />
        </Link>
        <Profile>
          <img
            src="https://avatars1.githubusercontent.com/u/39508440?s=460&v=4"
            alt={user.name}
          />
          <div>
            <span>Bem-vindo,</span>
            {userType === 'Customer' && <strong>{user.name}</strong>}
            {userType === 'Company' && <strong>{user.company_name}</strong>}
          </div>
        </Profile>
        {userType === 'Customer' && (
          <StyledLink type="button" to="/profile-customer">
            <FiEdit />
          </StyledLink>
        )}
        {userType === 'Company' && (
          <StyledLink type="button" to="/profile-company">
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
