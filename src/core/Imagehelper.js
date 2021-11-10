import React from 'react';
import axios from 'axios';
import { API } from '../backend';
const Imagehelper = async (link) => {
	try {
		const ids = await fetch(`${API}/tshirt/getImage/${link}`);
		return ids.json();
	} catch (err) {
		console.log(err);
	}
};
export default Imagehelper;
