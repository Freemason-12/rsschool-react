import { ChangeEventHandler, Key } from 'react';
export interface CardProps {
	name: string;
	onClick?: () => void;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	// onChecked?: () => void;
	// onUnchecked?: () => void;
	checked?: boolean;
	id?: Key | null | undefined;
}
