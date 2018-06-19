import { Injectable } from '@angular/core';
import { QuestionApi, Question, LoopBackFilter } from '../../sdk';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';//igh
import { ServiceUrl } from '../serviceUrl';//igh

@Injectable()
export class QuestionService {
  private pushcomentarioUrl: string;

  constructor(public http: Http,
    private questionApi: QuestionApi,
    private url:ServiceUrl,
  ){
    this.pushcomentarioUrl=String(this.url.getUrlpushComentario());
  }

  getQuestions(){
   let filter: LoopBackFilter = {
     "include":{
       "relation": "answers"
     }
   }
   return this.questionApi.find<Question>(filter)
   .toPromise()
  }

  getQuestion(questionId){
    let query = {
      id: questionId
    }
    return this.questionApi.find<Question>({where: query})
    .toPromise()
  }

  getQuestionsBySlug(slug){
       
    let filter: LoopBackFilter = {
      "include":{
        "relation": "answers"
      },
      "where": {
        "questionSlug": slug
      }
    }
    console.log('Aqui estoy, regresando de firebase...'); 
    return this.questionApi.find<Question>(filter)
    .toPromise()
  }

  deleteQuestion(questionId){
    return this.questionApi.deleteById<Question>(questionId)
    .toPromise()
  }

  updateQuestion(values){
    let data = new Question();
    data.question = values.question;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    data.questionSlug = values.questionSlug;
    return this.questionApi.updateAttributes<Question>(values.id, data)
    .toPromise()
  }

  createQuestion(values){
    let data = new Question();
    data.question = values.question;
    data.questionSlug = values.questionSlug
    return this.questionApi.create<Question>(data)
    .toPromise()
  }

  //igh
  pushComentario(values, id_usuario:number,id_solicitud:number,id_status:number){
    return this.http.get(this.pushcomentarioUrl+values+"&id_usuario="+id_usuario+"&id_solicitud="+id_solicitud+"&id_status="+id_status)
      .map((res) => res.json());
  }

}
