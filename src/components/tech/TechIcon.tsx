import React from 'react';

import pythonIcon from '../../assets/tech_icons/python.svg';
import cIcon from '../../assets/tech_icons/c.svg';
import cppIcon from '../../assets/tech_icons/cplusplus.svg';
import javaIcon from '../../assets/tech_icons/java.svg';
import jsIcon from '../../assets/tech_icons/javascript.svg';
import tsIcon from '../../assets/tech_icons/typescript.svg';
import sqlIcon from '../../assets/tech_icons/sql.svg';
import phpIcon from '../../assets/tech_icons/php.svg';
import htmlIcon from '../../assets/tech_icons/html5.svg';
import cssIcon from '../../assets/tech_icons/css3.svg';
import reactIcon from '../../assets/tech_icons/react.svg';
import nextjsIcon from '../../assets/tech_icons/nextjs.svg';
import viteIcon from '../../assets/tech_icons/vite.svg';
import tailwindIcon from '../../assets/tech_icons/tailwindcss.svg';
import alpineIcon from '../../assets/tech_icons/alpinejs.svg';
import reactflowIcon from '../../assets/tech_icons/reactflow.svg';
import nodejsIcon from '../../assets/tech_icons/nodejs.svg';
import expressIcon from '../../assets/tech_icons/express.svg';
import fastapiIcon from '../../assets/tech_icons/fastapi.svg';
import sqlalchemyIcon from '../../assets/tech_icons/sqlalchemy.svg';
import networkxIcon from '../../assets/tech_icons/networkx.svg';
import postgresqlIcon from '../../assets/tech_icons/postgresql.svg';
import mysqlIcon from '../../assets/tech_icons/mysql.svg';
import sqliteIcon from '../../assets/tech_icons/sqlite.svg';
import redisIcon from '../../assets/tech_icons/redis.svg';
import neonIcon from '../../assets/tech_icons/neon.svg';
import scikitlearnIcon from '../../assets/tech_icons/scikitlearn.svg';
import pytorchIcon from '../../assets/tech_icons/pytorch.svg';
import tensorflowIcon from '../../assets/tech_icons/tensorflow.svg';
import numpyIcon from '../../assets/tech_icons/numpy.svg';
import pandasIcon from '../../assets/tech_icons/pandas.svg';
import gitIcon from '../../assets/tech_icons/git.svg';
import githubIcon from '../../assets/tech_icons/github.svg';
import dockerIcon from '../../assets/tech_icons/docker.svg';
import linuxIcon from '../../assets/tech_icons/linux.svg';
import pytestIcon from '../../assets/tech_icons/pytest.svg';
import vitestIcon from '../../assets/tech_icons/vitest.svg';
import railwayIcon from '../../assets/tech_icons/railway.svg';
import renderIcon from '../../assets/tech_icons/render.svg';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, string> = {
  python: pythonIcon,
  c: cIcon,
  'c++': cppIcon,
  cplusplus: cppIcon,
  java: javaIcon,
  javascript: jsIcon,
  js: jsIcon,
  typescript: tsIcon,
  ts: tsIcon,
  sql: sqlIcon,
  php: phpIcon,
  html5: htmlIcon,
  html: htmlIcon,
  css3: cssIcon,
  css: cssIcon,
  react: reactIcon,
  'next.js': nextjsIcon,
  nextjs: nextjsIcon,
  next: nextjsIcon,
  vite: viteIcon,
  vitejs: viteIcon,
  'tailwind css': tailwindIcon,
  tailwindcss: tailwindIcon,
  tailwind: tailwindIcon,
  'alpine.js': alpineIcon,
  alpinejs: alpineIcon,
  alpine: alpineIcon,
  'react flow': reactflowIcon,
  reactflow: reactflowIcon,
  'node.js': nodejsIcon,
  nodejs: nodejsIcon,
  node: nodejsIcon,
  'express.js': expressIcon,
  expressjs: expressIcon,
  express: expressIcon,
  fastapi: fastapiIcon,
  sqlalchemy: sqlalchemyIcon,
  networkx: networkxIcon,
  postgresql: postgresqlIcon,
  postgres: postgresqlIcon,
  mysql: mysqlIcon,
  'sqlite (wal mode)': sqliteIcon,
  sqlite: sqliteIcon,
  redis: redisIcon,
  neon: neonIcon,
  'scikit-learn': scikitlearnIcon,
  scikitlearn: scikitlearnIcon,
  pytorch: pytorchIcon,
  tensorflow: tensorflowIcon,
  numpy: numpyIcon,
  pandas: pandasIcon,
  git: gitIcon,
  github: githubIcon,
  docker: dockerIcon,
  linux: linuxIcon,
  pytest: pytestIcon,
  vitest: vitestIcon,
  railway: railwayIcon,
  render: renderIcon,
};

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 18, className = '' }) => {
  const key = name.toLowerCase().trim();
  const iconSrc = ICON_MAP[key];

  if (!iconSrc) {
    return null;
  }

  const isAdaptiveDark = key === 'github' || key.includes('express');

  return (
    <img
      src={iconSrc}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`tech-icon-img${isAdaptiveDark ? ' tech-icon-adaptive-dark' : ''} ${className}`.trim()}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};
