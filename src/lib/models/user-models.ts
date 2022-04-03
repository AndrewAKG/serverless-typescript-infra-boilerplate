export interface CreateUserProfileRequest {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
}

export interface UserProfileInfo {
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth: string;
}
