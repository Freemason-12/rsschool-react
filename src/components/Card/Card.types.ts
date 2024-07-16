import { Key } from 'react';
export interface CardProps {
	name: string;
	onClick?: () => void;
	key?: Key | null | undefined;
}
