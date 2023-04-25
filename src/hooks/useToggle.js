import { useState } from 'react';

export const useToggle = () => {
	const [visible, setVisible] = useState(false);

	const open = () => setVisible(true);
	const close = () => setVisible(false);
	const toggle = () => setVisible((prevValue) => !prevValue);

	return [visible, toggle, open, close];
};
