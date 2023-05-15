# Librarian - friendly Chatbot

## PL: Bibliotekarz, przyjazny chatbot

Librarian is a chatbot that can be added to your digital library as a friendly adviser that helps users to get to know more about your digital assets, licenses, broken links issues, and more.

Librarian was created by a librarian who helped users of libraries and digital libraries through many years with problems such as: search issues, broken links or licenses and rights to digital resources. Chatbot was trained on years of experience of exchange topics between librarians and readers.

Form more information contact me: njeszke.front@gmail.com

## Technology
ReactJS, NodeJS with Express, DialogFlow, MongoDB, Materialize CSS.

## Client and Server
Client demo : https://chatbot-react-fnov412wq-nataliajeszke.vercel.app/
Server : https://chatbot-react.onrender.com/ 

## Librarian flow
Client is connected to Express.
Express runs as a proxy for DialogFlow and MongoDB.
MongoDB collects all users inputs that are flaged by DialogFlow as "input.unknown", means it collects questions that DialogFlow couldn't handle, so there is a room and solution for improvement for our Librarian.

## Improvement of Librarian
More information provided to DialogFlow about q and a.
Build ability for the long chat.
Creating more natural chatting experience.
When MongoDB is not enough, try another database storage.

