export default function DateHumanizer(date) {

    let calendar = date.split('-');
    let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    let year = calendar[0];
    let month = parseInt(calendar[1]);
    let day = calendar[2];

    return day + ' ' + mois[month - 1] + ' ' + year;
}