const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-3 text-center">
      <p className="text-lg font-semibold">
        "Challenge Your Mind, Elevate Your Knowledge!"
      </p>
      <p className="text-sm mt-2">
        &copy; {new Date().getFullYear()} Quiz Soft. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
