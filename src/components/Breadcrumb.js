import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div style={{ marginTop: '-50px',padding: '10px', fontSize: '0.9em' }}>
      <Link to="/register" className="linkService">ユーザー登録</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const breadcrumbName = value === 'terms-of-service' ? '利用規約' : 'プライバシーポリシー';

        return (
          <span key={to}>
          <span className="breadcrumb-separator">＞</span>
            <Link to={to} className="linkService">{breadcrumbName}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
