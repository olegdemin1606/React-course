const members = [
  {id:1, fio: 'Демин О.С.', date: '2001-01-21'},
  {id:2, fio: 'Петров А.В.', date: '2002-11-21'},
  {id:3, fio: 'Семенов Д.С.', date: '2000-01-28'},
  {id:4, fio: 'Иванов С.С.', date: '2001-02-20'},
]

export const initialList = [
  {id:1, title:'Телевизор', created_at:'2025-01-27', completed_at:'2025-01-28', points:[1,2,3,4], description:'описание', members: [members[0], members[1]], status: 'complite'},
  {id:2, title:'Компьютер', created_at:'2025-01-21', completed_at:'2025-01-29', points:[1,5,3,7], description:'описание 2', members: [members[0], members[1], members[2], members[3]], status: 'start'},
  {id:3, title:'Телефон', created_at:'2025-01-20', completed_at:'2025-02-21', points:[1,5,3,8], description:'описание 3', members: [members[0], members[1], members[2]], status: 'complite'},
  {id:4, title:'Магнитофон', created_at:'2025-01-11', completed_at:'2025-03-24', points:[1,5,3,2], description:'описание 4', members: [members[1], members[2]], status: 'start'},
  {id:5, title:'Пылесос', created_at:'2025-01-27', completed_at:'2025-01-27', points:[1,2,3,6], description:'описание 2111', members: [members[2], members[3]], status: 'start'},
  {id:6, title:'Фен', created_at:'2025-01-21', completed_at:'2025-01-29', points:[1,5,3,7], description:'описание 22', members: [members[0]], status: 'start'},
  {id:7, title:'Холодильник', created_at:'2025-01-20', completed_at:'2025-02-11', points:[1,5,3,8], description:'описание 613', members: [members[0], members[2]], status: 'start'},
  {id:8, title:'Вентилятор', created_at:'2025-01-11', completed_at:'2025-03-14', points:[1,5,3,2], description:'описание 4221', members: [members[0], members[3]], status: 'start'},
]
