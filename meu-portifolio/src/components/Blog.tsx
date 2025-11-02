import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, MessageCircle, ThumbsUp, Send, Plus, PenSquare } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  image: string;
  likes: number;
  comments: Comment[];
}

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "O Futuro do React: Server Components",
    description: "Explorando as novidades do React Server Components e como eles vão revolucionar o desenvolvimento web.",
    content: "React Server Components representam uma mudança fundamental na forma como construímos aplicações React...",
    date: "15 Out 2024",
    category: "React",
    image: "https://images.unsplash.com/photo-1654375408506-382720d3e05f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZ3JhbW1pbmclMjBjb2RlfGVufDF8fHx8MTc2MjA5MDI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 42,
    comments: [
      {
        id: "c1",
        author: "Maria Silva",
        avatar: "MS",
        content: "Excelente artigo! Server Components realmente mudam o jogo. Estou ansioso para usar em produção.",
        date: "16 Out 2024",
        likes: 8
      },
      {
        id: "c2",
        author: "João Santos",
        avatar: "JS",
        content: "Muito interessante! Você acha que isso vai substituir completamente o SSR tradicional?",
        date: "17 Out 2024",
        likes: 3
      }
    ]
  },
  {
    id: "2",
    title: "TypeScript: Por que Todo Dev Deveria Usar",
    description: "Benefícios práticos do TypeScript em projetos reais e como ele melhora a qualidade do código.",
    content: "TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais seguro e manutenível...",
    date: "22 Out 2024",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGRlc2lnbnxlbnwxfHx8fDE3NjIwMDQ3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 35,
    comments: [
      {
        id: "c3",
        author: "Ana Costa",
        avatar: "AC",
        content: "TypeScript mudou completamente minha forma de programar. Não consigo mais trabalhar sem!",
        date: "23 Out 2024",
        likes: 12
      }
    ]
  },
  {
    id: "3",
    title: "Node.js vs Deno: Uma Comparação Honesta",
    description: "Analisando as diferenças, vantagens e desvantagens de cada runtime JavaScript.",
    content: "Tanto Node.js quanto Deno têm seus pontos fortes. Vamos explorar quando usar cada um...",
    date: "28 Out 2024",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1614790871804-fe037bdc1214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MjAyMDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 28,
    comments: []
  }
];

export function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    image: ""
  });

  const handleAddComment = (postId: string) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "Você",
      avatar: "VC",
      content: commentText,
      date: "Agora",
      likes: 0
    };

    setBlogPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setNewComments(prev => ({ ...prev, [postId]: "" }));
  };

  const handleLikePost = (postId: string) => {
    setBlogPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddPost = () => {
    if (!newPost.title.trim() || !newPost.description.trim() || !newPost.content.trim() || !newPost.category) return;

    const post: BlogPost = {
      id: `${Date.now()}`,
      title: newPost.title,
      description: newPost.description,
      content: newPost.content,
      date: "Agora",
      category: newPost.category,
      image: newPost.image || "https://images.unsplash.com/photo-1654375408506-382720d3e05f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZ3JhbW1pbmclMjBjb2RlfGVufDF8fHx8MTc2MjA5MDI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 0,
      comments: []
    };

    setBlogPosts([post, ...blogPosts]);
    setNewPost({ title: "", description: "", content: "", category: "", image: "" });
    setNewPostOpen(false);
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Blog de Tecnologia</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Compartilhando conhecimento sobre desenvolvimento e tecnologia
          </p>
          
          <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Criar Novo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Novo Post do Blog</DialogTitle>
                <DialogDescription>
                  Compartilhe seus conhecimentos e experiências com a comunidade
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="post-title">Título</Label>
                  <Input
                    id="post-title"
                    placeholder="Título do seu post"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-description">Descrição</Label>
                  <Textarea
                    id="post-description"
                    placeholder="Um breve resumo do seu post"
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-content">Conteúdo</Label>
                  <Textarea
                    id="post-content"
                    placeholder="Escreva o conteúdo completo do seu post..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-category">Categoria</Label>
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                    <SelectTrigger id="post-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Dicas">Dicas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-image">URL da Imagem (opcional)</Label>
                  <Input
                    id="post-image"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se deixar em branco, uma imagem padrão será usada
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewPostOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPost}>
                  <PenSquare className="mr-2 h-4 w-4" />
                  Publicar Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{post.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="flex items-center gap-4 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLikePost(post.id)}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {post.comments.length} Comentários
                  </Button>
                </div>

                {expandedPosts[post.id] && (
                  <div className="w-full space-y-4">
                    {/* Existing Comments */}
                    {post.comments.length > 0 && (
                      <div className="space-y-3 border-t pt-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{comment.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-muted rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">
                                  {comment.date}
                                </span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                              <Button variant="ghost" size="sm" className="h-6 mt-2 px-2">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {comment.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Comment Form */}
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Adicione um comentário..."
                          value={newComments[post.id] || ""}
                          onChange={(e) =>
                            setNewComments(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))
                          }
                          className="resize-none"
                          rows={3}
                        />
                        <Button
                          onClick={() => handleAddComment(post.id)}
                          size="sm"
                          disabled={!newComments[post.id]?.trim()}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Comentar
                        </Button>
                      </div>
                    </div>
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
