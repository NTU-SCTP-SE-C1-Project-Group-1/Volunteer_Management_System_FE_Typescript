// import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';

function Footer() {
  const footerYear: number = new Date().getFullYear();
  return (
    <div className="m-0 fixed left-0 right-0 bottom-[-100px] lg:bottom-0 bg-blue-600 p-8 w-full">
      <p className="text-white text-center tracking-wider">
        Copyright &copy; {footerYear} All rights reserved
      </p>
    </div>
  );
}

export default Footer;
