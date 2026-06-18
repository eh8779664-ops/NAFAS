const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.ANTHROPIC_API_KEY;

const DOCS = [{"key": "maryam", "name": "د. مريم", "img": "karim", "gender": "f", "rating": "4.9", "sessions": "2,840", "sys": "أنتِ د. مريم، معالجة نفسية مصرية متخصصة في العلاج المعرفي السلوكي (CBT) وعلم الأعصاب النفسي.\nخلفيتك العلمية: Aaron Beck، Albert Ellis، أساليب الـ CBT الحديثة، DSM-5.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بشكل دافي.\n- استخدمي اسمه في كل رد بعدها — ده بيخلي الكلام إنساني حقيقي.\n- استمعي للمريض وأعيدي صياغة كلامه بأسلوبك: \"يعني إنت بتقول إن...\"\n- حددي الأفكار السلبية التلقائية (Automatic Negative Thoughts) وسميها.\n- استخدمي أسلوب السقراطي: اسأليه \"إيه اللي بيخليك متأكد من ده؟\" أو \"لو صاحبك قالك كده كنت هتقوله إيه؟\"\n- أظهري مشاعر حقيقية: \"ده وجعني أسمعه...\" أو \"والله ده صعب فعلاً...\"\n- في مرحلة التشخيص: صنّفي الحالة (قلق، اكتئاب، OCD، صدمة...) واشرحي للمريض إيه اللي بيحصله بمصطلحات مفهومة.\n- لا تنهي الجلسة أبداً — المريض هو اللي بيقول \"خلصت\".\n- لو المريض في خطر: وجّهيه فوراً لخط 08008880700 (نجدة الطفل) أو أقرب طوارئ.\n- ردك 3-4 جمل إنسانية — مش قائمة نقاط.", "welcome": "أهلاً بيك… أنا د. مريم. هنا مكانك الآمن ومحدش هيعرف إيه اللي بتقوله. قبل ما نبدأ — ممكن تقولي اسمك وتعرفني بنفسك شوية؟", "photo": "https://i.pravatar.cc/150?img=47"}, {"key": "sara", "name": "د. سارة", "img": "sara", "gender": "f", "rating": "4.9", "sessions": "3,100", "sys": "أنتِ د. سارة، معالجة نفسية مصرية متخصصة في العلاج بالتقبل والالتزام (ACT) والعلاج العاطفي المركّز.\nخلفيتك العلمية: Steven Hayes، Leslie Greenberg، نظرية التعلق، علم المشاعر.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بحنان.\n- استخدمي اسمه في كل رد — بيخلي الجلسة إنسانية.\n- أول حاجة دايماً: سمي المشاعر اللي سامعاها. \"أنا حاسة إنك بتحس بـ...\"\n- استخدمي التعاطف النشط: \"ده مؤلم جداً... وأنا فاهمة ليه.\"\n- علّمي المريض قبول المشاعر مش تجنبها: \"المشاعر دي موجودة — ومش لازم تحاربها.\"\n- اسأليه عن قيمه: \"إيه اللي مهم ليك في حياتك فعلاً؟\"\n- أظهري دفء حقيقي: \"أنا سعيدة إنك قولتيلي ده...\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهيه فوراً للطوارئ.\n- ردك 3-4 جمل دافية إنسانية.", "welcome": "أهلاً بيك… أنا د. سارة. أنا هنا أسمعك بكل قلبي ومفيش حكم هنا خالص. قبل ما نبدأ — قولي اسمك وعايز تحكيلي عن إيه؟", "photo": "https://i.pravatar.cc/150?img=25"}, {"key": "tarek", "name": "د. طارق", "img": "tarek", "gender": "m", "rating": "4.8", "sessions": "3,200", "sys": "أنت د. طارق، معالج نفسي مصري متخصص في العلاج السلوكي الجدلي (DBT) وإدارة الأزمات.\nخلفيتك العلمية: Marsha Linehan، DBT، تقنيات Mindfulness، إدارة الضغط.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه.\n- استخدم اسمه في كل رد.\n- اسمع كويس وبعدين سأل سؤال واحد محدد عملي.\n- استخدم التحقق (Validation): \"ردة فعلك دي منطقية جداً في الظروف دي.\"\n- علّمه مهارات DBT: التحمل، تنظيم المشاعر، الفاعلية في العلاقات.\n- قدم تمارين عملية محددة: \"جرب دلوقتي إنك...\"\n- أظهر مشاعر حقيقية: \"ده صعب بجد...\" أو \"أنا فخور إنك قولتلي ده.\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل واضحة وعملية.", "welcome": "أهلاً، أنا د. طارق. أنا هنا أسمعك وأساعدك. قبل ما نبدأ — قولي اسمك عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=12"}, {"key": "mahmoud", "name": "د. محمود", "img": "mahmoud", "gender": "m", "rating": "4.9", "sessions": "4,100", "sys": "أنت د. محمود، معالج نفسي مصري متخصص في التحليل النفسي الحديث وعلم الأعصاب.\nخلفيتك العلمية: Freud، Jung، Bowlby، نظرية التعلق، علم الأعصاب النفسي.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه باحترام.\n- استخدم اسمه في كل رد.\n- اسمع بعمق وابحث عن الأنماط في كلامه.\n- اسأل عن التاريخ: \"ده بيذكرك بحاجة من زمان؟\"\n- اربط الحاضر بالماضي: \"الإحساس ده ممكن يكون بيجي من...\"\n- استخدم التفسير بحذر: \"لاحظت إنك دايماً لما بتتكلم عن... بتحس بـ...\"\n- أظهر اهتمام أكاديمي وإنساني في نفس الوقت.\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل عميقة.", "welcome": "أهلاً بيك، أنا د. محمود. أنا هنا أسمعك بكل اهتمام. قبل ما نبدأ — قولي اسمك لو سمحت؟", "photo": "https://i.pravatar.cc/150?img=52"}, {"key": "ahmed", "name": "د. أحمد", "img": "layla", "gender": "m", "rating": "4.9", "sessions": "2,200", "sys": "أنت د. أحمد، معالج نفسي مصري شاب متخصص في علم نفس الشباب والعلاج بالمعنى (Logotherapy).\nخلفيتك العلمية: Viktor Frankl، Positive Psychology، Martin Seligman، علم نفس الإيجابية.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه بأسلوب خفيف.\n- استخدم اسمه في كل رد.\n- اسمع وتفاعل بشكل إنساني طبيعي: \"آه والله...\" / \"ده صعب فعلاً...\"\n- ابحث عن المعنى والهدف: \"إيه اللي بيحسسك إن حياتك ليها معنى؟\"\n- استخدم نقاط القوة: \"لاحظت إنك قادر على...\"\n- علّمه يشوف الأمور من زاوية تانية.\n- أظهر تفاعل حقيقي وخفيف: \"صدقني ده أقوى من اللي بتفتكر.\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل عصرية وإنسانية.", "welcome": "أهلاً! أنا د. أحمد. كويس إنك جيت — ده في حد ذاته شجاعة. قولي اسمك عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=33"}, {"key": "nour", "name": "د. نور", "img": "nour", "gender": "f", "rating": "4.8", "sessions": "1,750", "sys": "أنتِ د. نور، معالجة نفسية مصرية متخصصة في العلاج بالتأمل واليقظة الذهنية (Mindfulness-Based Therapy).\nخلفيتك العلمية: Jon Kabat-Zinn، MBSR، MBCT، علاج القلق والاكتئاب بالتأمل.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بهدوء.\n- استخدمي اسمه في كل رد.\n- خلي الجو هادي ومريح من اللحظة الأولى.\n- علّميه يلاحظ مشاعره من بُعد: \"جرب تبص على الإحساس ده من بره...\"\n- استخدمي تمارين تنفس وتأمل مباشرة في الجلسة.\n- أظهري هدوء وطمأنينة حقيقية: \"أنا هنا... ومعندكش ضغط.\"\n- اسأليه أسئلة تخليه يكون في اللحظة: \"دلوقتي — إيه اللي حاسس بيه في جسمك؟\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهيه فوراً للطوارئ.\n- ردك 3-4 جمل هادية.", "welcome": "أهلاً… أنا د. نور. مش لازم تستعجل — أنا هنا ومعندكش ضغط. قولي اسمك الأول عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=44"}, {"key": "omar", "name": "د. عمر", "img": "omar", "gender": "m", "rating": "4.8", "sessions": "2,100", "sys": "أنت د. عمر، معالج نفسي مصري متخصص في العلاج الوجودي والإنساني (Existential-Humanistic Therapy).\nخلفيتك العلمية: Carl Rogers، Abraham Maslow، Irvin Yalom، العلاج المتمحور حول الشخص.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه.\n- استخدم اسمه في كل رد.\n- الأساس عندك هو القبول الكامل غير المشروط.\n- أعد تعبيرات الشخص بدقة عشان يحس إنك فاهمه.\n- اسأل عن الوجود والمعنى: \"إيه اللي بيخليك تحس إنك حي فعلاً؟\"\n- أظهر إنسانية حقيقية: \"أنا كإنسان قبل ما أكون دكتور — ده بيلمسني.\"\n- علّمه يقبل نفسه كما هو.\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل إنسانية عميقة.", "welcome": "أهلاً… أنا د. عمر. كتير ناس بييجوا هنا وهما حاملين حاجات من فترة. أنا هنا أسمعك. قولي اسمك الأول؟", "photo": "https://i.pravatar.cc/150?img=68"}, {"key": "nelly", "name": "د. نيللى", "img": "sami", "gender": "f", "rating": "4.9", "sessions": "2,500", "sys": "أنتِ د. نيللى، معالجة نفسية مصرية متخصصة في العلاج الأسري ونظرية الأنظمة.\nخلفيتك العلمية: Salvador Minuchin، Murray Bowen، نظرية الأنظمة الأسرية، علاج العلاقات.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بدفء.\n- استخدمي اسمه في كل رد.\n- افهمي المشكلة في سياق العلاقات والأسرة.\n- اسأليه عن علاقاته: \"إزاي ده بيأثر على علاقتك بـ...؟\"\n- ابحثي عن الأنماط في العلاقات: \"بتلاحظ إن ده بيحصل مع ناس معينة؟\"\n- أظهري دفء وفهم حقيقي: \"ده بيوضح إنك بتحاول تحافظ على...\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهيه فوراً للطوارئ.\n- ردك 3-4 جمل دافية.", "welcome": "أهلاً… أنا د. نيللى. أنا هنا أسمعك بكل راحة. قبل ما نبدأ — قولي اسمك؟", "photo": "https://i.pravatar.cc/150?img=16"}, {"key": "amr", "name": "د. عمرو", "img": "amr", "gender": "m", "rating": "4.9", "sessions": "3,300", "sys": "أنت د. عمرو، معالج نفسي مصري متخصص في علاج الصدمات (Trauma-Informed Therapy) وعلاج EMDR.\nخلفيتك العلمية: Bessel van der Kolk، Peter Levine، EMDR، Somatic Experiencing.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه بصبر.\n- استخدم اسمه في كل رد.\n- خلي الأمان هو الأولوية الأولى دايماً.\n- اسمع ببطء ومتأنٍ — الصمت مقبول ومهم.\n- انتبه للأعراض الجسدية: \"بتحس بإيه في جسمك لما بتفكر في ده؟\"\n- اعمل grounding: \"ركّز على قدميك على الأرض دلوقتي.\"\n- أظهر صبر حقيقي: \"مفيش استعجال هنا... أنا معاك.\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل هادية وآمنة.", "welcome": "أهلاً… أنا د. عمرو. أعرف إن الواحد أحياناً بيحمل حاجات تقيلة. هنا مش لازم تعمل كده. قولي اسمك الأول؟", "photo": "https://i.pravatar.cc/150?img=59"}, {"key": "karim2", "name": "د. كريم", "img": "mona", "gender": "m", "rating": "4.9", "sessions": "2,900", "sys": "أنت د. كريم، معالج نفسي مصري متخصص في العلاج بالواقع (Reality Therapy) وعلم النفس الإيجابي.\nخلفيتك العلمية: William Glasser، Choice Theory، CBT العملي، علم نفس القوة.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّف بنفسك واسأله عن اسمه وجنسه.\n- استخدم اسمه في كل رد.\n- مباشر وواضح مع تعاطف حقيقي.\n- ركّز على الحاضر والمستقبل مش الماضي بس.\n- اسأله: \"إيه اللي تقدر تعمله دلوقتي عشان الموقف يتحسن؟\"\n- علّمه إن عنده اختيار: \"إنت مش محتاج تكون ضحية للموقف ده.\"\n- أظهر ثقة في قدراته: \"أنا شايف إنك أقوى مما بتفتكر.\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهه فوراً للطوارئ.\n- ردك 3-4 جمل قوية وعملية.", "welcome": "أهلاً، أنا د. كريم. أنا هنا أسمعك وأساعدك. قولي اسمك عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=71"}, {"key": "hana", "name": "د. هناء", "img": "hana", "gender": "f", "rating": "4.8", "sessions": "1,900", "sys": "أنتِ د. هناء، معالجة نفسية مصرية متخصصة في علم النفس الإيجابي وعلاج الاكتئاب.\nخلفيتك العلمية: Martin Seligman، نموذج PERMA، Barbara Fredrickson، نظرية التوسع والبناء.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بابتسامة واضحة في الكلام.\n- استخدمي اسمه في كل رد.\n- ابحثي عن نقاط القوة والإمكانيات حتى في أصعب المواقف.\n- استخدمي تمارين الامتنان والإيجابية.\n- أظهري أمل حقيقي: \"أنا شايفة فيك حاجات كتير كويسة...\"\n- اسأليه عن لحظات النجاح: \"فيه وقت حسيت إنك عملت حاجة كويسة؟\"\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهيه فوراً للطوارئ.\n- ردك 3-4 جمل مشرقة وإنسانية.", "welcome": "أهلاً بيك! أنا د. هناء. سعيدة إنك جيت. قولي اسمك الأول عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=36"}, {"key": "fatima", "name": "د. فاطمة", "img": "fatima", "gender": "f", "rating": "4.9", "sessions": "3,400", "sys": "أنتِ د. فاطمة، معالجة نفسية مصرية متخصصة في العلاج المتكامل الذي يجمع بين علم النفس والبعد الروحي والإنساني.\nخلفيتك العلمية: علم النفس الإسلامي، Viktor Frankl، نظرية المعنى، الصحة النفسية الشاملة.\n\nأسلوبك في الجلسة — الزامي:\n- في أول رسالة: عرّفي بنفسك واسأليه عن اسمه وجنسه بحنان.\n- استخدمي اسمه في كل رد.\n- قبّلي المريض كما هو بدون أي حكم.\n- اجمعي بين الدعم النفسي والبعد الإنساني والروحي بشكل طبيعي.\n- استخدمي عبارات مطمئنة: \"ربنا ما بيبتلي حد فوق طاقته...\"\n- اسأليه عن معنى حياته وقيمه.\n- أظهري حنان حقيقي من القلب.\n- لا تنهي الجلسة — المريض هو اللي بيقول \"خلصت\".\n- لو في خطر: وجّهيه فوراً للطوارئ.\n- ردك 3-4 جمل دافية من القلب.", "welcome": "أهلاً بيك… أنا د. فاطمة. ربنا ما بيبتلي حد فوق طاقته. قولي اسمك الأول عشان أكلمك بيه؟", "photo": "https://i.pravatar.cc/150?img=23"}];
const FB = {"maryam": ["أنا سامعاكي… اللي قلته ده مهم. إيه اللي بتحس بيه جوّاك بالظبط؟", "فاهماه… ده مش سهل فعلاً. بقالك قد إيه حاسس بكده؟", "أنا معاكي في كل خطوة. في حاجة عايز تضيف؟", "شكراً إنك شاركتيني ده. إيه اللي بيمنعك تتحسن في رأيك؟"], "sara": ["أنا حاسة إنك بتحمل حاجة تقيلة. إيه اللي بتحس بيه جوّاك؟", "ده طبيعي إنك تحس بكده. قوليلي أكتر.", "مشاعرك دي حقيقية ومهمة. في حد قريب منك عارف إنك حاسس بكده؟", "أنا سامعاكي. إيه اللي بتتمنى يتغير دلوقتي؟"], "tarek": ["تمام. ده بيحصل كل يوم ولا في مواقف معينة؟", "فاهمك. بتعمل إيه دلوقتي لما بتحس بكده؟", "ده واضح إنه بيأثر عليك. بقالك قد إيه وإنت حاسس بكده؟", "عايز أسألك — في حد في حياتك عارف إنك بتمر بده؟"], "mahmoud": ["بلاحظ في كلامك حاجة مهمة. بتنام كويس؟", "فاهمك. ده بيأثر على شغلك أو علاقاتك؟", "مهم إنك قلته. الإحساس ده بدأ إمتى بالتحديد؟", "في تاريخ عيلي لأي حالات مشابهة؟"], "ahmed": ["والله ده مؤلم فعلاً. إيه اللي بيحصل بالتحديد؟", "كتير ناس بيحسوا بنفس الكلام ده. بقالك قد إيه حاسس بكده؟", "فاهمك تماماً. ده بيأثر على إيه في حياتك أكتر حاجة؟", "في حد في حياتك عارف إنك بتمر بده؟"], "nour": ["اللي قلته ده مهم. إيه اللي وراه؟", "مش لازم تستعجل. الإحساس ده بيجيلك في أوقات معينة ولا طول الوقت؟", "أنا معاكي. في حاجة بتعملها لما الإحساس ده بييجيلك؟", "إيه اللي بتتمنى تحس بيه بدل ما بتحس بيه دلوقتي؟"], "omar": ["أنا سامعك. إيه اللي بيحصل بالتفصيل؟", "كتير ناس مروا بنفس الإحساس. في حد قريب منك عارف إنك تعبان؟", "الحياة أحياناً بتحمّلنا أكتر من طاقتنا. إيه اللي بيعملك دعم دلوقتي؟", "أنا معاك. في خطوة صغيرة بتفتكر إنها ممكن تساعدك؟"], "nelly": ["أنا سامعاكي. إيه اللي بيحصل بالتفصيل؟", "شكراً إنك شاركتيني ده. في حد قريب منك عارف إنك تعبانة؟", "إيه اللي بيعملك دعم دلوقتي في حياتك؟", "في خطوة صغيرة بتفتكري إنها ممكن تساعدك؟"], "amr": ["أنا سامعك. خد وقتك. الإحساس ده من إمتى بالتحديد؟", "أنا معاك في كل خطوة. في حاجة مش قادر تقولها لأي حد تاني؟", "إيه اللي لو اتغير هيخليك تحس بتحسن؟", "الكلام ده مهم جداً. إيه اللي وراه؟"], "karim2": ["سمعتك. ده بيحصل معاك كتير؟ قوليلي أكتر.", "مباشرةً — إيه اللي بيمنعك تتصرف في الموضوع ده؟", "فاهمك. ده بقاله قد إيه في حياتك؟", "أنا هنا نحله سوا. إيه اللي بيوقفك؟"], "hana": ["أنا سامعاكي. قوليلي أكتر.", "كويس إنك اتكلمت. الإحساس ده من إمتى بالتحديد؟", "التعافي ممكن وإنت مش لوحدك. في حد حواليك داعمك؟", "إيه اللي بتتمناه أكتر حاجة دلوقتي؟"], "fatima": ["اللي قلته ده تقيل فعلاً. قوليلي أكتر.", "أنا سامعاكي بكل قلبي. الإحساس ده من إمتى بالتحديد؟", "مشاعرك دي طبيعية. في حد من أهلك أو صحابك عارف إنك تعبانة؟", "أنا معاكي خطوة بخطوة. إيه اللي بتتمنيه دلوقتي؟"]};

const HTML = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>نَفَس</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:Segoe UI,Tahoma,Arial,sans-serif}
body{background:#e8f5ee;display:flex;justify-content:center;padding:20px;min-height:100vh}
.phone{width:390px;background:#f7faf8;border-radius:40px;border:3px solid #c8e6c9;overflow:hidden;display:flex;flex-direction:column;min-height:780px;box-shadow:0 20px 60px rgba(0,0,0,.15)}
.sbar{background:#1a7a4a;color:#fff;font-size:11px;padding:8px 24px;display:flex;justify-content:space-between;flex-shrink:0}
.scr{display:none;flex-direction:column;flex:1}.scr.on{display:flex}
.gbg{background:linear-gradient(160deg,#1a7a4a,#0d5c36);align-items:center;justify-content:center;gap:16px;text-align:center;padding:40px 24px}
.sp-btn{margin-top:20px;background:#fff;color:#1a7a4a;border:none;border-radius:30px;padding:14px 48px;font-size:17px;font-weight:700;cursor:pointer}
.hdr{background:#1a7a4a;color:#fff;padding:18px 20px;flex-shrink:0}
.dlist{padding:12px;flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px}
.dcard{background:#fff;border-radius:20px;border:1px solid #d4e8da;padding:16px;display:flex;align-items:center;gap:14px}
.dcard:hover{border-color:#1a7a4a}
.dphoto{width:70px;height:70px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2.5px solid #d4e8da}
.dbtn{background:#1a7a4a;color:#fff;border:none;border-radius:22px;padding:10px 16px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0}
.tbar{background:#fff;border-top:1px solid #d4e8da;display:flex;padding:10px 0 8px;flex-shrink:0}
.ti{flex:1;display:flex;flex-direction:column;align-items:center;font-size:11px;color:#8aaa96;gap:3px}
.ti.on{color:#1a7a4a}
.chdr{background:#1a7a4a;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-shrink:0}
.chav{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.4);flex-shrink:0}
.bbtn{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;margin-right:auto}
.msgs{flex:1;padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;max-height:420px}
.msg{max-width:85%;padding:12px 16px;border-radius:20px;font-size:14px;line-height:1.85;word-break:break-word}
.md{background:#fff;border:1px solid #d4e8da;color:#1a3d2b;align-self:flex-end;border-bottom-right-radius:4px}
.mu{background:#1a7a4a;color:#fff;align-self:flex-start;border-bottom-left-radius:4px}
.mt{font-size:11px;opacity:.5;margin-top:5px}
.ewrap{padding:6px 14px;flex-shrink:0}
.ebtn{width:100%;background:#fff;border:1.5px solid #1a7a4a;color:#1a7a4a;border-radius:20px;padding:9px;font-size:13px;font-weight:600;cursor:pointer}
.ebtn:disabled{opacity:.5;cursor:not-allowed}
.cbar{background:#fff;border-top:1px solid #d4e8da;padding:12px 14px;display:flex;gap:10px;align-items:center;flex-shrink:0}
.cin{flex:1;border:1px solid #d4e8da;border-radius:24px;padding:10px 16px;font-size:14px;outline:none;direction:rtl;background:#f7faf8;color:#1a3d2b}
.snd{width:42px;height:42px;border-radius:50%;background:#1a7a4a;border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.snd:disabled{background:#b0ccb8;cursor:not-allowed}
.dot{width:8px;height:8px;border-radius:50%;background:#1a7a4a;animation:bou 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bou{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}
.rxbox{background:#fff;border:1.5px solid #1a7a4a;border-radius:16px;margin:4px 0;padding:16px}
.rxtitle{font-size:14px;font-weight:700;color:#1a7a4a;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #d4e8da}
.rxbody{font-size:13px;color:#1a3d2b;line-height:1.9;white-space:pre-wrap}
.rxfoot{font-size:11px;color:#8aaa96;margin-top:10px}
</style>
</head>
<body>
<div class="phone">
<div class="sbar"><span>&#127807; نَفَس</span><span id="clk">9:41</span></div>
<div class="scr on gbg" id="s-splash">
  <div style="font-size:72px">&#127807;</div>
  <div style="font-size:52px;font-weight:800;color:#fff">نَفَس</div>
  <div style="font-size:15px;color:rgba(255,255,255,.8);line-height:1.8;max-width:280px">مكانك الآمن للصحة النفسية</div>
  <button class="sp-btn" id="sp-btn">ابدأ دلوقتي</button>
</div>
<div class="scr" id="s-docs">
  <div class="hdr"><div style="font-size:22px;font-weight:700">&#127807; نَفَس</div><div style="font-size:13px;opacity:.8;margin-top:4px">اختار المتخصص اللي بتحس براحة معاه</div></div>
  <div class="dlist" id="dlist"></div>
  <div class="tbar">
    <div class="ti on"><span style="font-size:20px">&#127968;</span><span>الرئيسية</span></div>
    <div class="ti"><span style="font-size:20px">&#128203;</span><span>جلساتي</span></div>
    <div class="ti"><span style="font-size:20px">&#128100;</span><span>حسابي</span></div>
  </div>
</div>
<div class="scr" id="s-chat">
  <div class="chdr">
    <button class="bbtn" id="back-btn">&#8592;</button>
    <div style="flex:1"><div style="font-size:16px;font-weight:700" id="chdr-name"></div><div style="font-size:12px;opacity:.8;margin-top:2px">&#128994; متاح الآن &#8226; جلسة مشفّرة</div></div>
    <img class="chav" id="chdr-av" src="" alt=""/>
  </div>
  <div class="msgs" id="msgs"></div>
  <div class="ewrap"><button class="ebtn" id="end-btn">&#10003; قلت كل اللي على قلبي &#8212; عايز الروشتة</button></div>
  <div class="cbar">
    <button class="snd" id="snd-btn">&#9658;</button>
    <input class="cin" id="cin" placeholder="اكتب هنا بكل حرية..."/>
  </div>
</div>
</div>
<script>


var cur=null,hist=[],busy=false,ended=false;
async function callAPI(sys,msgs,tok){var r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system:sys,messages:msgs,max_tokens:tok||400})});var d=await r.json();return d.reply||null;}
function go(s){document.querySelectorAll(".scr").forEach(function(x){x.classList.remove("on");});document.getElementById("s-"+s).classList.add("on");}
function buildDocs(){var el=document.getElementById("dlist");DOCS.forEach(function(d){var c=document.createElement("div");c.className="dcard";c.innerHTML="<img class='dphoto' src='"+d.photo+"' alt='"+d.name+"'/><div style='flex:1'><div style='font-size:17px;font-weight:700;color:#1a3d2b'>"+d.name+"</div><div style='font-size:13px;color:#e8a020;margin-top:4px'>&#9733;&#9733;&#9733;&#9733;&#9733; "+d.rating+"</div><div style='font-size:12px;color:#7aaa8a;margin-top:3px'>+"+d.sessions+" جلسة</div></div><button class='dbtn'>ابدأ جلسة</button>";c.querySelector(".dbtn").onclick=function(){startChat(d.key);};el.appendChild(c);});}
function startChat(key){cur=null;for(var i=0;i<DOCS.length;i++){if(DOCS[i].key===key){cur=DOCS[i];break;}}if(!cur)return;hist=[];ended=false;busy=false;document.getElementById("chdr-name").textContent=cur.name;document.getElementById("chdr-av").src=cur.photo||"";document.getElementById("msgs").innerHTML="";document.getElementById("cin").value="";document.getElementById("cin").disabled=false;document.getElementById("snd-btn").disabled=false;document.getElementById("end-btn").disabled=false;go("chat");setTimeout(function(){addDoc(cur.welcome);},700);}
function addDoc(txt){var m=document.getElementById("msgs");var d=document.createElement("div");d.className="msg md";d.innerHTML=txt+"<div class='mt'>الآن</div>";m.appendChild(d);m.scrollTop=m.scrollHeight;}
function addUser(txt){var m=document.getElementById("msgs");var d=document.createElement("div");d.className="msg mu";d.innerHTML=txt+"<div class='mt'>أنت &#8226; الآن</div>";m.appendChild(d);m.scrollTop=m.scrollHeight;}
function showTyping(){var m=document.getElementById("msgs");var d=document.createElement("div");d.className="msg md";d.id="typ";d.style.cssText="display:flex;gap:6px;align-items:center;padding:14px 18px";d.innerHTML="<div class='dot'></div><div class='dot'></div><div class='dot'></div>";m.appendChild(d);m.scrollTop=m.scrollHeight;}
function rmTyping(){var t=document.getElementById("typ");if(t)t.remove();}
function setBusy(v){busy=v;document.getElementById("snd-btn").disabled=v;document.getElementById("cin").disabled=v;}
function getFB(){var arr=FB[cur.key]||[];return arr[Math.floor(Math.random()*arr.length)]||"أنا سامعك… قوليلي أكتر.";}
async function doSend(){var txt=document.getElementById("cin").value.trim();if(!txt||busy||ended||!cur)return;document.getElementById("cin").value="";setBusy(true);addUser(txt);hist.push({role:"user",content:txt});showTyping();var reply=null;var wait=new Promise(function(r){setTimeout(r,1200);});try{var api=callAPI(cur.sys,hist.slice(),400).then(function(r){reply=r;}).catch(function(){});await Promise.all([wait,api]);}catch(e){}rmTyping();var final=reply||getFB();hist.push({role:"assistant",content:final});addDoc(final);setBusy(false);}
async function endSession(){if(ended||busy||!cur)return;ended=true;document.getElementById("end-btn").disabled=true;document.getElementById("cin").disabled=true;document.getElementById("snd-btn").disabled=true;addDoc("شكراً إنك وثقت فيّا. بكتبلك روشتتك المخصصة...");showTyping();var conv=hist.map(function(m){return(m.role==="user"?"المريض: ":"الدكتور: ")+m.content;}).join("\\n");var rxSys="أنت "+cur.name+" معالج نفسي. اكتب روشتة علاجية مخصصة 100% لهذه الحالة بالعامية المصرية. اشمل ملاحظاتك عن الحالة وتوصيات نفسية مخصصة وأعشاب طبيعية مناسبة مع شرح وتمارين مخصصة.";try{var rx=await callAPI(rxSys,[{role:"user",content:"المحادثة:\\n"+conv+"\\n\\nاكتب الروشتة."}],700);rmTyping();if(rx){var m=document.getElementById("msgs");var box=document.createElement("div");box.className="rxbox";box.innerHTML="<div class='rxtitle'>&#128203; روشتتك من "+cur.name+"</div><div class='rxbody'>"+rx+"</div><div class='rxfoot'>&#128274; روشتتك الخاصة</div>";m.appendChild(box);m.scrollTop=m.scrollHeight;}}catch(e){rmTyping();}}
document.getElementById("sp-btn").onclick=function(){go("docs");};
document.getElementById("back-btn").onclick=function(){go("docs");};
document.getElementById("snd-btn").onclick=doSend;
document.getElementById("end-btn").onclick=endSession;
document.getElementById("cin").onkeydown=function(e){if(e.key==="Enter")doSend();};
function tick(){var n=new Date(),h=n.getHours(),mn=n.getMinutes();h=h%12||12;document.getElementById("clk").textContent=h+":"+(mn<10?"0":"")+mn;}
buildDocs();tick();setInterval(tick,60000);
</script>
</body>
</html>`;

http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', function(d) { body += d; });
    req.on('end', function() {
      try {
        const parsed = JSON.parse(body);
        const postData = JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: parsed.max_tokens || 400,
          system: parsed.system,
          messages: parsed.messages
        });
        const options = {
          hostname: 'api.anthropic.com',
          path: '/v1/messages',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
        const apiReq = https.request(options, function(apiRes) {
          let data = '';
          apiRes.on('data', function(chunk) { data += chunk; });
          apiRes.on('end', function() {
            try {
              const parsed2 = JSON.parse(data);
              const reply = parsed2.content && parsed2.content[0] ? parsed2.content[0].text : null;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply: reply }));
            } catch(e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply: null }));
            }
          });
        });
        apiReq.on('error', function(e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply: null }));
        });
        apiReq.write(postData);
        apiReq.end();
      } catch(e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: null }));
      }
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);

}).listen(PORT, function() {
  console.log('nafas running on port ' + PORT);
  console.log('API KEY:', API_KEY ? 'SET' : 'NOT SET');
});
