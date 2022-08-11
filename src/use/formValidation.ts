import { defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { string } from 'yup'
import { db } from '../firebase';

defineRule('unique', async (value: string, args: string[] | { collection: string, field: string }) => {
   let collection: string, field: string
   if (Array.isArray(args)) {
      [collection, field] = args
   }
   else {
      ({ collection, field } = args)
   }
   const querySnapshot = await db.collection(collection).where(field, '==', value).get()
   return querySnapshot.empty
})

defineRule('incorrect', () => false)
defineRule('required', required)
defineRule('email', email)

configure({
   generateMessage: localize('en', {
      messages: {
         unique: 'The user with this {field} is already exist',
         email: '{field} is not valid',
         required: '{field} is required',
         incorrect: 'Email or password is incorrect'
      }
   })
})

export const registerSchema = {
   name: string().required('Name is required'),
   username: 'required|unique:users,username',
   email: 'required|email|unique:users,email',
   password: string().required('Password is required').min(6, 'The password is too short. It must contain at least 6 characters')
}

export const loginSchema = {
   email: 'required|email',
   password: 'required'
}

export const modalSchema = {
   title: 'required',
   date: 'required'
}