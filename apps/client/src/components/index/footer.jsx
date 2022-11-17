const Footer = ({title}) => {

  return <footer>
    <hr />
    <span>{`${title} © ${new Date().getFullYear()}`}</span>
    <style jsx>
      {`
			footer {
				text-align: center;
    			padding: 20px 15%;
			}
			hr {
				border: gray solid .5px;
    			margin-bottom: 25px;
			}
		`}
    </style>
  </footer>;
};

export default Footer;
