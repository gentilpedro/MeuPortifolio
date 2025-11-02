import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MessageSquarePlus, MessageCircle, ThumbsUp, CheckCircle, Clock, Plus } from "lucide-react";

interface Answer {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isAccepted: boolean;
}

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  tags: string[];
  likes: number;
  answers: Answer[];
  isResolved: boolean;
}

const initialQuestions: Question[] = [
  {
    id: "q1",
    title: "Como otimizar performance em React com grandes listas?",
    content: "Estou trabalhando em um projeto que renderiza listas com milhares de itens. Já tentei usar React.memo, mas ainda está lento. Alguém tem sugestões de bibliotecas ou técnicas para melhorar a performance?",
    author: "Carlos Mendes",
    avatar: "CM",
    date: "01 Nov 2024",
    category: "React",
    tags: ["performance", "react", "otimização"],
    likes: 15,
    isResolved: true,
    answers: [
      {
        id: "a1",
        author: "Ana Developer",
        avatar: "AD",
        content: "Recomendo usar react-window ou react-virtualized. Essas bibliotecas implementam virtualização, renderizando apenas os itens visíveis na tela. Isso melhora drasticamente a performance!",
        date: "01 Nov 2024",
        likes: 22,
        isAccepted: true
      },
      {
        id: "a2",
        author: "Pedro Tech",
        avatar: "PT",
        content: "Além da virtualização, considere usar useMemo e useCallback nos componentes filhos para evitar re-renders desnecessários.",
        date: "01 Nov 2024",
        likes: 8,
        isAccepted: false
      }
    ]
  },
  {
    id: "q2",
    title: "Melhor forma de gerenciar estado global em 2024?",
    content: "Estou começando um novo projeto e estou em dúvida entre usar Redux, Zustand ou Context API. Qual vocês recomendam para uma aplicação de médio porte?",
    author: "Julia Santos",
    avatar: "JS",
    date: "02 Nov 2024",
    category: "State Management",
    tags: ["redux", "zustand", "context", "estado"],
    likes: 23,
    isResolved: false,
    answers: [
      {
        id: "a3",
        author: "Ricardo Dev",
        avatar: "RD",
        content: "Zustand é excelente para médio porte! É muito mais simples que Redux e tem performance melhor que Context API. Recomendo muito!",
        date: "02 Nov 2024",
        likes: 15,
        isAccepted: false
      }
    ]
  },
  {
    id: "q3",
    title: "TypeScript vale a pena para projetos pequenos?",
    content: "Estou desenvolvendo um projeto pessoal pequeno e me pergunto se adicionar TypeScript não seria overhead demais. Quais são as opiniões de vocês?",
    author: "Marcos Lima",
    avatar: "ML",
    date: "02 Nov 2024",
    category: "TypeScript",
    tags: ["typescript", "javascript", "opinião"],
    likes: 12,
    isResolved: false,
    answers: []
  }
];

export function Community() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const [newAnswerOpen, setNewAnswerOpen] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

  // New question form
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  // New answer form
  const [newAnswerContent, setNewAnswerContent] = useState("");

  const handleAddQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim() || !newQuestion.category) return;

    const question: Question = {
      id: `q${Date.now()}`,
      title: newQuestion.title,
      content: newQuestion.content,
      author: "Você",
      avatar: "VC",
      date: "Agora",
      category: newQuestion.category,
      tags: newQuestion.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      likes: 0,
      answers: [],
      isResolved: false
    };

    setQuestions([question, ...questions]);
    setNewQuestion({ title: "", content: "", category: "", tags: "" });
    setNewQuestionOpen(false);
  };

  const handleAddAnswer = (questionId: string) => {
    if (!newAnswerContent.trim()) return;

    const answer: Answer = {
      id: `a${Date.now()}`,
      author: "Você",
      avatar: "VC",
      content: newAnswerContent,
      date: "Agora",
      likes: 0,
      isAccepted: false
    };

    setQuestions(questions.map(q =>
      q.id === questionId
        ? { ...q, answers: [...q.answers, answer] }
        : q
    ));

    setNewAnswerContent("");
    setNewAnswerOpen(null);
  };

  const handleLikeQuestion = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, likes: q.likes + 1 } : q
    ));
  };

  const handleLikeAnswer = (questionId: string, answerId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? {
            ...q,
            answers: q.answers.map(a =>
              a.id === answerId ? { ...a, likes: a.likes + 1 } : a
            )
          }
        : q
    ));
  };

  const toggleAnswers = (questionId: string) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <section id="comunidade" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Comunidade - Tire suas Dúvidas</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Faça perguntas e compartilhe conhecimento com a comunidade
          </p>
          
          <Dialog open={newQuestionOpen} onOpenChange={setNewQuestionOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Fazer uma Pergunta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Pergunta</DialogTitle>
                <DialogDescription>
                  Compartilhe sua dúvida com a comunidade
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question-title">Título</Label>
                  <Input
                    id="question-title"
                    placeholder="Qual é sua dúvida?"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question-content">Descrição</Label>
                  <Textarea
                    id="question-content"
                    placeholder="Descreva sua dúvida em detalhes..."
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question-category">Categoria</Label>
                  <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}>
                    <SelectTrigger id="question-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="State Management">State Management</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question-tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="question-tags"
                    placeholder="react, hooks, performance"
                    value={newQuestion.tags}
                    onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewQuestionOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddQuestion}>
                  Publicar Pergunta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={question.isResolved ? "default" : "secondary"}>
                        {question.isResolved ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Resolvida
                          </>
                        ) : (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Aberta
                          </>
                        )}
                      </Badge>
                      <Badge variant="outline">{question.category}</Badge>
                    </div>
                    <CardTitle className="mb-2">{question.title}</CardTitle>
                    <CardDescription>{question.content}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{question.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <span>{question.author}</span>
                    <span className="text-muted-foreground"> • {question.date}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLikeQuestion(question.id)}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {question.likes}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAnswers(question.id)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {question.answers.length} Respostas
                  </Button>
                  <Dialog open={newAnswerOpen === question.id} onOpenChange={(open) => setNewAnswerOpen(open ? question.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        Responder
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Responder Pergunta</DialogTitle>
                        <DialogDescription className="line-clamp-2">
                          {question.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Textarea
                          placeholder="Compartilhe sua resposta ou solução..."
                          value={newAnswerContent}
                          onChange={(e) => setNewAnswerContent(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setNewAnswerOpen(null)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => handleAddAnswer(question.id)}>
                          Publicar Resposta
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {expandedQuestions[question.id] && (
                  <div className="w-full space-y-4 border-t pt-4">
                    {question.answers.length > 0 ? (
                      question.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className={`flex gap-3 p-4 rounded-lg ${
                            answer.isAccepted ? "bg-green-50 border border-green-200" : "bg-muted"
                          }`}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{answer.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm">{answer.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {answer.date}
                              </span>
                              {answer.isAccepted && (
                                <Badge variant="default" className="ml-auto">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Resposta Aceita
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm mb-2">{answer.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8"
                              onClick={() => handleLikeAnswer(question.id, answer.id)}
                            >
                              <ThumbsUp className="mr-2 h-3 w-3" />
                              {answer.likes}
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        Nenhuma resposta ainda. Seja o primeiro a responder!
                      </p>
                    )}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
