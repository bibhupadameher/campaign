export function generateName() {
  const firstname = [
    'Kai',
    'Eliana',
    'Jaden',
    'Ezra',
    'Luca',
    'Rowan',
    'Nova',
    'Amara',
    'Aaliyah',
    'Finn',
  ];
  const lastname = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Martinez',
    'Wilson',
  ];
  const rand_first = Math.floor(Math.random() * firstname.length);
  const rand_last = Math.floor(Math.random() * lastname.length);

  return firstname[rand_first] + ' ' + lastname[rand_last];
}

export function getDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

  console.log(formattedDateTime);

  return formattedDateTime;
}
