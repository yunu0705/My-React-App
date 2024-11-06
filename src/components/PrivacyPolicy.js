import React from 'react';
import Breadcrumb from './Breadcrumb';
import { Helmet } from 'react-helmet';


const PrivacyPolicy = () => {
  return (
    <>
    <Helmet>
    <title>プライバシーポリシー</title>
  </Helmet>
    <div className="body-2">
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <div className="mainFormService">
        <Breadcrumb />
        <h1>プライバシーポリシー</h1>
        <h3>第1条（個人情報）</h3>
        <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>

        <h3>第2条（個人情報の収集方法）</h3>
        <p>ストリーマーズランド（以下「私共」）は、ユーザーが利用登録をする際に氏名、電話番号、メールアドレス、銀行口座番号、クレジットカード番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、私共の提携先（情報提供元、広告主、広告配信先などを含みます。以下「提携先」といいます。）などから収集することがあります。</p>

        <h3>第3条（個人情報を収集・利用する目的）</h3>
        <p>私共が個人情報を収集・利用する目的は、以下のとおりです。</p>
        <ul>
          <li>私共のサービスの提供・運営のため</li>
          <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
          <li>サービスの新機能、更新情報、キャンペーン及び他サービスの案内メールの送付</li>
          <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
          <li>利用規約に違反したユーザーや、不正利用を防止するため</li>
          <li>登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
          <li>有料サービスにおいて利用料金を請求するため</li>
          <li>上記の利用目的に付随する目的</li>
        </ul>

        <h3>第4条（利用目的の変更）</h3>
        <p>私共は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。変更後の目的はウェブサイト上で通知または公表します。</p>

        <h3>第5条（個人情報の第三者提供）</h3>
        <p>私共は、以下の場合を除き、ユーザーの同意なく第三者に個人情報を提供しません。</p>
        <ul>
          <li>人の生命、身体または財産の保護に必要であり、本人の同意が困難な場合</li>
          <li>公衆衛生の向上または児童の健全な育成推進のために必要で本人の同意が困難な場合</li>
          <li>国の機関等が法令の定める事務を遂行する場合で、本人の同意により事務の遂行に支障がある場合</li>
          <li>あらかじめ告知・公表し、個人情報保護委員会に届出した場合</li>
        </ul>
        <p>前項の定めにかかわらず、以下の場合には、提供先は第三者に該当しません。</p>
        <ul>
          <li>利用目的の達成に必要な範囲内での個人情報取扱いの委託</li>
          <li>事業承継に伴う個人情報の提供</li>
          <li>共同利用の通知または容易に知り得る状態での提供</li>
        </ul>

        <h3>第6条（個人情報の開示）</h3>
        <p>私共は、本人から個人情報の開示を求められた場合、遅滞なく開示します。ただし、以下のいずれかに該当する場合は開示しないことがあります。</p>
        <ul>
          <li>本人または第三者の権利利益を害するおそれがある場合</li>
          <li>私共の業務の適正な実施に著しい支障がある場合</li>
          <li>その他法令に違反する場合</li>
        </ul>
        <p>履歴情報や特性情報などの個人情報以外の情報については、原則として開示いたしません。</p>

        <h3>第7条（個人情報の訂正および削除）</h3>
        <p>ユーザーは、私共の保有する自己の個人情報が誤っている場合、訂正等をメールやお問い合わせフォームから請求できます。必要に応じて訂正等を行い、ユーザーに通知します。</p>

        <h3>第8条（個人情報の利用停止等）</h3>
        <p>本人から、利用目的を超えた取り扱い、不正取得に基づく利用停止等を求められた場合、調査後、必要に応じて利用停止等を行います。代替策が可能な場合は、これを講じるものとします。</p>

        <h3>第9条（プライバシーポリシーの変更）</h3>
        <p>本ポリシーは法令に別段の定めがある場合を除き、ユーザーに通知することなく変更できます。変更後のポリシーはウェブサイト掲載時から効力を生じます。</p>

        <h3>第10条（お問い合わせ窓口）</h3>
        <p>本ポリシーに関するお問い合わせは、下記窓口までお願いいたします。</p>
        <p>屋号：ALcストリーマーズランド<br />代表：小林 寛<br />Eメールアドレス：contact@example.com</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;