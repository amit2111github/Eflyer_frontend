import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import '../css/footer.css';
const Footer = () => {
	return (
		<>
			<div className="footer_section layout_padding">
				<div className="container">
					<div className="footer_logo">
						<a>
							<img src="https://res.cloudinary.com/dnd5dhyzv/image/upload/v1636368072/Logo/logo_wmff3n.png" />
						</a>
					</div>
					<div className="footer_menu">
						<ul>
							<li>
								<FaTwitter />
								<span style={{ marginLeft: '10px' }}>Twitter</span>
							</li>
							<li>
								<FaFacebook />
								<span style={{ marginLeft: '10px' }}>Facebook</span>
							</li>
							<li>
								<FaMailBulk />
								<span style={{ marginLeft: '10px' }}>Mail</span>
							</li>
							<li>
								<FaInstagram />
								<span style={{ marginLeft: '10px' }}>Instagram</span>
							</li>
							<li>
								<FaYoutube />
								<span style={{ marginLeft: '10px' }}>Youtube</span>
							</li>
						</ul>
					</div>
					<div className="location_main">
						Help Line Number : <a>+1 1800 1200 1200</a>
					</div>
				</div>
			</div>

			<div class="copyright_section">
				<div class="container">
					<p class="copyright_text">
						© {new Date().getFullYear()} All Rights Reserved. Design by
						<a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new"> @ Amit</a>
					</p>
				</div>
			</div>
		</>
	);
};
export default Footer;

/* <Box>
			<h1 style={{ color: 'green', textAlign: 'center', marginTop: '-50px' }}>
				GeeksforGeeks: A Computer Science Portal for Geeks
			</h1>
			<Container>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">Aim</FooterLink>
						<FooterLink href="#">Vision</FooterLink>
						<FooterLink href="#">Testimonials</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">Writing</FooterLink>
						<FooterLink href="#">Internships</FooterLink>
						<FooterLink href="#">Coding</FooterLink>
						<FooterLink href="#">Teaching</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="#">Uttar Pradesh</FooterLink>
						<FooterLink href="#">Ahemdabad</FooterLink>
						<FooterLink href="#">Indore</FooterLink>
						<FooterLink href="#">Mumbai</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="#">
							<FaFacebook />
							<span style={{ marginLeft: '10px' }}>Facebook</span>
						</FooterLink>
						<FooterLink href="#">
							<FaInstagram />
							<span style={{ marginLeft: '10px' }}>Instagram</span>
						</FooterLink>
						<FooterLink href="#">
							<FaTwitter />
							<span style={{ marginLeft: '10px' }}>Twitter</span>
						</FooterLink>
						<FooterLink href="#">
							<FaYoutube />
							<span style={{ marginLeft: '10px' }}>Youtube</span>
						</FooterLink>
					</Column>
				</Row>
			</Container>
		</Box> */
