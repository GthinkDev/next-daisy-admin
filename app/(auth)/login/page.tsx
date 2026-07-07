import React from 'react'

const Login = () => {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<fieldset className='fieldset bg-base-100 shadow-2xl rounded-box w-xs  p-4'>
				<legend className='fieldset-legend'>Login</legend>

				<label className='label'>Email</label>
				<input type='email' className='input' placeholder='Email' />

				<label className='label'>Password</label>
				<input type='password' className='input' placeholder='Password' />

				<button className='btn btn-neutral mt-4'>Login</button>
			</fieldset>
		</div>
	)
}

export default Login
