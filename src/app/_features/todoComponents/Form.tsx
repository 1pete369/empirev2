// import React, { useState } from 'react'


// type TodoProps = {
//     todo : string
//     todos : []
//     setTodo : React.Dispatch<React.SetStateAction<string>>
//     setTodos : React.Dispatch<React.SetStateAction<never[]>>
// }

// export default function Form({todo, todos} : TodoProps) {


//   return (
//     <form>
//         <div className="flex gap-6 items-center">
//         <label htmlFor="username" className="">
//           Todo:
//         </label>
//         <input
//           required
//           type="text"
//           id="todo"
//           className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1 placeholder:text-stone-500 text-black min-w-60 ${todo!=="" && "bg-sky-100"}`}
//           placeholder="Enter todo"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />
//         </div>
//     </form>
//   )
// }
