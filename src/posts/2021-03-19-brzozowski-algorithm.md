---
title: Brzozowski のアルゴリズムとは結局何なのか
created: 2021-03-19
updated: 2021-03-19
---

$A$ を言語 $L$ を受理する DFA とすると、$D(R(D(R(A))))$ は言語 $L$ を受理する最小 DFA となります。
ここで $D(A)$ というのは部分集合構成法による決定化の処理で、$R(A)$ は DFA の各遷移と初期状態・受理状態を反対にして NFA を求める処理を表します。
この 2 回のリバースと決定化を行う DFA の最小化アルゴリズムは **Brozozowski のアルゴリズム** として知られています。
Brzozowski 微分などで知られる [Janusz Brzozowski](<https://en.wikipedia.org/wiki/Janusz_Brzozowski_(computer_scientist)>) が 1960 年代に発表したアルゴリズムです。

以前 Qiita でこのアルゴリズムでどうして DFA の最小化が行なえるのかを説明したのですが([Brzozowski のアルゴリズム - なぜ DFA を 2 回反転すると最小化できるのか
](https://qiita.com/make_now_just/items/471d272442803796e37a))、これによって構成される DFA がどのようなものなのかは説明していませんでした。
今回この記事では、Brozozowski のアルゴリズムで求まる最小 DFA がどのようなものなのかを別の角度から少し解説したいと思います。

# 解説

この記事で説明する内容は、次の参考文献の「3. Brzozowski's algorithm」の内容を元にしています。

> Garcıa, P., D. López, and M. Vázquez de Parga. DFA minimization: from Brzozowski to Hopcroft. Technical report, Universidad Politécnica de Valencia. Informes técnicos de investigación DSIC-TLCC, 2013. ([PDF](https://m.riunet.upv.es/bitstream/handle/10251/27623/partial%20rev%20determ.pdf))

## 準備

$X$を集合として、$x$ が $S$ に含まれるとき $x \subseteq X$ と表し、$Y$ が $X$ の部分集合であるとき $Y \subseteq X$ で表します。
集合 $X, Y$ について $X \cap Y$ は $X$ と $Y$ の共通部分、$X \cup Y$ は $X$ と $Y$ の和集合を表します。
$X$ のすべての部分集合全体からなる集合を $\mathscr{P}(X)$ で表します。
空集合は $\varnothing$ とします。

有限の集合 $\Sigma$ をアルファベットとして、$\Sigma$ の元を有限個並べたもの全体からなる集合を $\Sigma^\ast$ と表し、$\Sigma$ の元を文字、$\Sigma^\ast$ の元を文字列と呼びます。
2 つの文字列 $u, v \in \Sigma^\ast$ を順番に並べたものを $u \cdot v$ で表します。
文字列 $w$ の並びを逆向きにしたもの (リバースしたもの) を $w^R$ で表し、文字列の集合 $L$ に含まれるすべての文字列をリバースしたものを $L^R$ で表します。
空文字列は $\varepsilon$ とします。

5 タプル $(Q, \Sigma, \delta, I, F)$ を NFA (非決定性有限状態オートマトン) と呼びます。
ここで $Q$ は状態の有限集合、$\Sigma$ はアルファベット、$\delta : Q \times \Sigma \to \mathscr{P}(Q)$ は遷移関数、$I \subseteq Q$ は初期状態の集合、$F \subseteq Q$ は受理状態の集合です。
状態の部分集合 $P \subseteq Q$ に対して拡張した遷移関数を $\delta_D(P, \sigma) = \bigcup_{p \in P}  \delta(p, \sigma)$ と定義して、さらに文字列 $w$ に対して拡張した遷移関数を $\delta^\ast(P, \varepsilon) = P,\ \delta^\ast(P, \sigma w) = \delta^\ast(\delta_D(P, \sigma), w)$ と定義します。
このとき状態 $q \in Q$ について $L_{I, q} = \{ w \in \Sigma^\ast\ |\ q \in \delta^\ast(I, w) \}$ を $q$ の左言語、$L_{q, F} = \{ w \in \Sigma^\ast\ |\ \delta^\ast(\{ q \}, w) \cap F \ne \varnothing \}$ を $q$ の右言語とします。
状態 $q$ について左言語が空ではないものを到達可能な状態と呼び、すべての状態が到達可能なときその NFA を到達可能な NFA と呼びます。
初期状態の右言語の和集合 $\bigcup_{q \in I} L_{q, F}$ を NFA の受理する言語と呼びます。
2 つの NFA のそれぞれの値が等しいとき、2 つの NFA を構造的に等しいといいます。
さらに、NFA の初期状態がちょうど 1 つで、遷移関数の遷移先 $\delta(q, \sigma)$ が高々 1 つのとき、その NFA を DFA (決定性有限状態オートマトン) と呼び、NFA に関する用語は DFA に対しても同様に用いられます。
誤解がない場合、DFA のただ 1 つの初期状態を $q_0$、遷移関数の遷移先を $\delta(p, \sigma) = q$ のように表記する場合があります。
言語 $L$ を受理する DFA の各状態の右言語が互いに異なるとき、その DFA を言語 $L$ の最小 DFA と呼びます。
今回の記事で扱う NFA・DFA はすべて到達可能なものとします。

DFA $A = (Q, \Sigma, \delta, q_0, F)$ について、$R(A) = (Q, \Sigma, \delta_R, F, \{ q_0 \})$ を $A$ をリバースした NFA とします。
ここで遷移関数は $\delta_R(p, \sigma) = \{ q \in Q \ |\ \delta(q, a) = p \}$ と定義されます。
$R(A)$ の受理する言語は元の DFA $A$ の受理する言語 $L$ をリバースした言語 $L^R$ となります。

NFA $A$ について、$D(A) = (\mathscr{R}, \Sigma, \delta_D, I, F_D)$ を $A$ を決定化した DFA とします。
ここで遷移関数 $\delta_D$ は状態の集合について拡張したもので、$\mathscr{R}$ は $\mathscr{P}(Q)$ の部分集合で初期状態から到達可能な状態の集合からなるものとし、受理状態は $F_D = \{ P \in \mathscr{R}\ |\ F \cap P \ne \varnothing \}$ とします。
$D(A)$ の受理する言語は元の NFA $A$ の受理する言語 $L$ と等しいものとなります。

## Brzozowski のアルゴリズム

Brzozowski のアルゴリズムによって最小 DFA が求められるのは、次の定理に依ります。
(この部分の内容は以前の Qiita の記事の内容と同様です。)

**定理**: 言語 $L$ を受理する DFA $A$ について、$D(R(A))$ は $L^R$ を受理する最小 DFA となる。

**証明**:

1. $A$ は DFA なので各状態の左言語は互いに素である。
   (互いに異なるではなく **互いに素**、つまり、2 つの異なる状態 $p, q \in Q$ について $L_{I, p} \cap L_{I, q} = \varnothing$ であることに注意してください。)
2. $D(R(A))$ の状態 $P$ は $A$ の状態の集合で、その右言語は $P$ に含まれる各状態の元の DFA での左言語の和集合となる。

以上の 1. と 2. より $D(R(A))$ の各状態の右言語は互いに異なるため、$D(R(A))$ は最小 DFA となる。$\Box$

よって、 $D(R(D(R(A))))$ は 2 回リバースすることで、元の言語の最小 DFA が求まっているわけです。

## DFA の最小化

$D(R(D(R(A))))$ がどのようなオートマトンなのかの話題に入る前に、Brzozowski のアルゴリズム以外の一般的な最小 DFA の求め方について簡単に説明しておきます。

最小 DFA は、状態の集合を受理状態とそれ以外の部分に分割して、さらにその部分に区別可能な (右言語が明らかに異なる) ものがある場合は分割を繰り返し、それ以上分割できなくなったところで終了する、というアルゴリズムによって求められます。
このようにして最小 DFA を求めるアルゴリズムには、Moore のアルゴリズムや Hopcroft のアルゴリズムといったものがあります。
これらのアルゴリズムは [Partition Refinement](https://en.wikipedia.org/wiki/Partition_refinement) というデータ構造を用いることで効率的に計算できるのですが、今回はあまり関係ないので、その話題にはあまり触れないでおきます。
興味のある方は自分で調べてください。

重要なのは、これらのアルゴリズムは最終的に DFA の状態の集合を、区別できない (右言語の等しい) 状態の部分に分割する、ということです。
言い換えると、これらのアルゴリズムでは状態を引数に取る割当て (関数) $\pi$ で、2 つの状態 $p, q \in Q$ について $\pi(p) =  \pi(q)$ ならば $L_{p, F} = L_{q, F}$ となるようなものを求めています。
そして、この関数を DFA の状態の集合や遷移関数の状態などのすべてに適用することで、最小 DFA が得られるわけです。

しかし、Brzozowski のアルゴリズムではいきなり DFA が求まっており、この関数がどのようなものなのか明確ではありません。
ですが、DFA の最小化アルゴリズムですので、そのような関数は確実に存在します。
それを明らかにするのが、この記事のもう 1 つのテーマとなります。

## Brzozowski のアルゴリズムで得られる DFA

ここからは、本題である $D(R(D(R(A))))$ がどのような DFA なのかについて説明します。

いきなり結論からいきます。

**定理**: DFA $A = (Q, \Sigma, \delta, q_0, F)$ として、それをリバース・決定化した DFA を $D(R(A)) = (\mathscr{R}, \Sigma, \delta_{DR}, F, \{ P \in \mathscr{R}\ |\ q_0 \in P \})$ とおく。
このとき、$D(R(D(R(A))))$ は次の DFA $(Q', \Sigma, \delta', \mathscr{R}_{q_0}, F')$ と構造的に等しい。$Q', \delta', F'$ はそれぞれ、

- $Q' = \{ \mathscr{R}_q \ |\ q \in Q \}$
- $F' = \{ \mathscr{R}_q \ |\ q \in F \}$
- $\delta'(\mathscr{R}_p, \sigma) = \mathscr{R}_{\delta(q, \sigma)}$ ($\delta(p, \sigma)$ が存在する場合のみ)

ただし、状態 $q \in Q$ について $\mathscr{R}_q = \{ P \in \mathscr{R} \ |\ q \in P \}$ ($q$ を含むすべての $D(R(A))$ の状態) とする。

**証明**:

$D(R(D(R(A))))$ の初期状態が $\mathscr{R}_{q_0}$ なのはリバース・決定化の定義より明らか。
よって $\delta(\mathscr{R}_p, \sigma) = \mathscr{R}_{\delta(q, \sigma)}$ が成り立つかどうかが問題となる。

状態 $p, q$ と文字 $\sigma$ について、元の DFA で $\delta(p, \sigma) = q$ となっていたとする。

- まず、$P \in \mathscr{R}_q$ について $\delta_{DR}(P, \sigma)$ は必ず $p$ を含む、つまり $\delta_{DR}(P, \sigma) \in \mathscr{R}_p$ であることが分かる。
  なぜなら、$p \in \delta_R(q, \sigma)$ で $\delta_{DR}(P, \sigma)$ は $\delta(q, \sigma)$ を部分集合として含むからである。
- さらに $S \in \mathscr{R}_p$ について $\delta_{DR}$ をリバースした遷移関数 $\delta_{RDR}$ で $\sigma$ で遷移すると、その遷移先 $T \in \delta_{RDR}(S, \sigma)$ は必ず $q$ を含む、つまり $\delta_{RDR}(S, \sigma) \subseteq \mathscr{R}_q$ である。
  なぜなら、もし $q$ を含まない状態 $T'$ に遷移したとすると、$\delta_{DR}(T', \sigma) = S$ が存在して、$p \in \delta_R(r, \sigma)$ かつ $\delta(p, \sigma) = r$ である $r \in T'$ が存在することになるが、$\delta(p, \sigma) = q$ なので $r = q$ となり矛盾するためである。

つまり、すべての $P \in \mathscr{R}_q$には $\delta_{DR}$ で必ず $\mathscr{R}_p$ のいずれかの元に遷移して、
かつ $T \in \mathscr{R}_p$ は $\delta_{RDR}$ で $\mathscr{R}_q$ の元以外に遷移することはない。
このことから、$\delta_{DRDR}(\mathscr{R}_p, \sigma) = \mathscr{R}_q$ と分かる。

よって、$\delta_{DRDR}$ が $\mathscr{R}_p$ から $\mathscr{R}_q$ のようにしか遷移しないということは、$D(R(D(R(A))))$ で到達可能な状態は $\mathscr{P}(\mathscr{R})$ のうち適当な状態 $q \in Q$ で $\mathscr{R}_q$ と表せるもののみである。
最後に、リバース・決定化の定義より $D(R(D(R(A))))$ の受理状態 $P$ は元の DFA の受理状態 $F$ を含むが、到達可能なものは $\mathscr{R}_q$ の形で表せるものだけなので、$D(R(D(R(A))))$ の受理状態は $q \in F$ で $\mathscr{R}_q$ で表せるものとなることが分かる。

以上で、 $D(R(D(R(A))))$ は上で定義した DFA と構造的に等しいことが確認できた。$\Box$

さて、この定理により、Brzozowski のアルゴリズムで求まる DFA を得られるような割当ては $\pi(q) = \mathscr{R}_q$ であると分かりました。
さらに言えば、2 回目のリバース・決定化は必要がなくて、$R(D(A))$ の状態から各状態 $q \in Q$ の $\mathscr{R}_q$ を求めるだけで十分であることも分かります。
$R(D(A))$ を計算する時点で指数時間となってしまうので、これで計算量や実際の計算速度が大きく縮まることは無いと思いますが、それなりに興味深い結果だと思います。

# まとめ

この記事では、Brzozowski のアルゴリズムで求まる最小 DFA $D(R(D(R(A))))$ の状態は、$D(R(A))$ の到達可能な状態 (状態の集合) のうち、ある状態を含むようなものからなる集合となっていることを確認しました。
Brzozowski のアルゴリズムはシンプルかつエレガントな一方、他の最小化アルゴリズムとの関係が分かりづらいと感じる部分があるのですが、今回の記事が理解の助けになれば幸いです。

また、もし $R(D(A))$ を実際に計算せずに各 $\mathscr{R}_q$ が計算できれば、最小 DFA を効率良く計算できるのではないか、と感じた方もいるのではないでしょうか。
実際、冒頭で挙げた参考文献はそのような内容になっていて、$D(R(A))$ を求めずに計算するアルゴリズムを示した後、Hopcroft のアルゴリズムに関する考察を通じて、アルゴリズムを最適化しています。
このようにして既存の手法を発展させていくのは、中々面白い話だと思います。

もう 1 つ Brzozowski のアルゴリズムに関して言えば、$A$ が DFA なら $D(R(A))$ は最小 DFA になりますが、DFA に限らず特定の NFA $A$ でも $D(R(A))$ が最小になることもあるんじゃないか、という直観があります。
これも実は正しくて、NFA $A$ がアトミックであるとき、かつそのときに限り $D(R(A))$ は最小になります。
このアトミックという条件などについては、[Theory of átomata](https://www.sciencedirect.com/science/article/pii/S0304397514002953) という論文で詳しく説明されています。
これは 2014 年の論文なのですが、なんとこの論文の著者の一人は Brzozowski その人です。
1960 年代に自身の発表したアルゴリズムを、50 年以上かけてさらに洗練させるバイタリティにはとんでもないものを感じます。
さらに、最初の決定化をアトミックな NFA を求める処理 $At(A)$ にする (つまり $D(R(At(R(A)))))$) ことで、[多項式時間で最小 DFA を求められる](https://www.sciencedirect.com/science/article/pii/S0304397513001965) ことが知られています。
この辺りの話も色々と興味深いので、いつか解説したいです。

それでは、この記事に最後まで目を通していただきありがとうございました。
