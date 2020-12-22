import React from "react";

function mockComponent<P extends React.DOMAttributes<T>, T extends Element>(name: string): (props: React.ClassAttributes<T> & P) => React.DOMElement<P, T> {
  return (props: React.ClassAttributes<T> & P): React.DOMElement<P, T> => {
    return React.createElement(name, props, props.children);
  };
}

const mockCard = mockComponent('Card');
mockCard.Title = mockComponent('Card.Title');
mockCard.Cover = mockComponent('Card.Cover');
mockCard.Content = mockComponent('Card.Content');

export const Avatar = mockComponent('Avatar');
export const Paragraph = mockComponent('Paragraph');
export const Title = mockComponent('Title');
export const TextInput = mockComponent('TextInput');
export const Card = mockCard;
