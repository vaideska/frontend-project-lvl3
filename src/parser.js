const getDescription = (elem) => (elem.querySelector('description') === null ? '' : elem.querySelector('description').textContent);
const getLink = (elem) => (elem.querySelector('link').textContent);

const parseDataDOM = (dataDOM) => {
  const channelElement = dataDOM.querySelector('channel');
  const titleFeed = channelElement.querySelector('title').textContent;
  const descriptionFeed = getDescription(channelElement);

  const itemElements = dataDOM.querySelectorAll('item');
  const posts = Array.from(itemElements).reverse().map((itemElement) => ({
    title: itemElement.querySelector('title').textContent,
    link: getLink(itemElement),
    description: getDescription(itemElement),
  }));
  return { titleFeed, descriptionFeed, posts };
};

const parseRSS = (data) => {
  const parser = new DOMParser();
  const dataDOM = parser.parseFromString(data, 'application/xml');
  if (dataDOM.querySelector('parsererror')) {
    const error = new Error();
    error.isParsingError = true;
    throw error;
    //  throw new Error('notValidRss');
  }
  return parseDataDOM(dataDOM);
};

export default parseRSS;
