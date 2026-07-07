import { DatabaseSearch, RefreshCw } from 'lucide-react'

const SearchBar = () => {
	return (
		<div className='grid grid-cols-5 gap-2 '>
			<label className='input input-sm'>
				<svg className='h-[1em] opacity-50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
					<g strokeLinejoin='round' strokeLinecap='round' strokeWidth='2.5' fill='none' stroke='currentColor'>
						<circle cx='11' cy='11' r='8'></circle>
						<path d='m21 21-4.3-4.3'></path>
					</g>
				</svg>
				<input type='search' required placeholder='可搜索昵称/姓名/手机号' />
			</label>

			<select title='Framework' defaultValue='Pick a Framework' className='select select-sm'>
				<option disabled={true}>Pick a Framework</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
			</select>

			<select title='Framework' defaultValue='Pick a Framework' className='select select-sm'>
				<option disabled={true}>Pick a Framework</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
			</select>

			<select title='Framework' defaultValue='Pick a Framework' className='select select-sm'>
				<option disabled={true}>Pick a Framework</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
			</select>

			<select title='Framework' defaultValue='Pick a Framework' className='select select-sm'>
				<option disabled={true}>Pick a Framework</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
			</select>

			<div className='flex gap-2'>
				<button className='btn btn-primary  btn-outline btn-sm '>
					<DatabaseSearch className='h-4' /> 搜索
				</button>
				<button className='btn btn-outline btn-neutral btn-sm opacity-40 '>
					<RefreshCw className='h-4' /> 重置
				</button>
			</div>
		</div>
	)
}

export default SearchBar
