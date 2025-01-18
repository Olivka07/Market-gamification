export function getDataAttributeByName(target, name) {
    return target?.dataset?.[name];
}

export function findItemByKeyValue(items, value, key = 'id') {
    return items.find(item => item[key] === value);
}

export function hrefClickImitation(href) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = href;

    link.click();
}