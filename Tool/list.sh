for file in ./ExamView/Files/*.md
do
  echo ".${file#./ExamView}" >> ./ExamView/config.txt
done