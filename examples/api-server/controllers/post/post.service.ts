import fetch from 'node-fetch';

import { Catch } from '../../../../src/decorators';
import { HttpError } from '../../../../src/utils';

export class PostService {

  @Catch('Try Catch block activated.')
  public async getAll () : Promise<object[]> {
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    return await data.json();
  }

  @Catch('Try Catch block activated.')
  public async getOne (postId : number) : Promise<object> {
    let data = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    let json = await data.json();

    if (!json.title) throw new HttpError('Not found post.', 404);

    return json;
  }

  @Catch('Try Catch block activated.')
  public async insert (body : { title : string, body : string, postId : number }) : Promise<object> {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title: body.title, body: body.body, postId: body.postId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    return await data.json();
  }

}