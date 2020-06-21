// @flow
import { EProfileKeys } from 'constants/profile'

import ProfileBuilder from 'builders/ProfileBuilder'
import UserProfile from 'app/User/structure'

const UserProfileInstance = ProfileBuilder(UserProfile, EProfileKeys.USER)

export default UserProfileInstance
