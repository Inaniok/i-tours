import { useSelector } from 'react-redux';
import {
	selectUser,
	selectIsLoggedIn,
	selectIsRefreshing,
	selectIsRefreshingError,
} from 'store/auth/selectors';

export const useAuth = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const isRefreshing = useSelector(selectIsRefreshing);
	const isRefreshingError = useSelector(selectIsRefreshingError);
	const user = useSelector(selectUser);

	return {
		isLoggedIn,
		isRefreshing,
		isRefreshingError,
		user,
	};
};
